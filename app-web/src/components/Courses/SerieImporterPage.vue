<template>
  <div class="course-page">
    <section  v-if="selected_serie" class="hero is-medium is-primary is-bold">
      <div class="hero-head">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                  <router-link to="/courses" tag="li"><a href="">Treinamentos</a></router-link>
                  <router-link :to="`/courses/${course.slug}`" tag="li"><a href="">{{course.name}}</a></router-link>
                  <router-link :to="`/courses/vimeo-importer/${course.slug}/${selected_serie.slug}`" active-class="is-active" tag="li"><a href="">Importar aulas do vimeo</a></router-link>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ selected_serie.name }}
          </h1>
          <h2 class="subtitle">
            {{ course.name }}
          </h2>
        </div>
      </div>
    </section>
    <div class="container is-fluid">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p> Projeto do Vimeo:</p>
          </div>
          <div class="level-item">
            <div class="field">
              <div class="control">
                <div class="select is-primary" :class="{'is-loading': is_loading_vimeo_project_videos}">
                  <select @change="onSelectVimeoProject($event)">
                    <option> -- Selecione um projeto que deseja trabalhar -- </option>
                    <option v-for="project in projects" :key="project.id" :value="project.id">{{project.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section v-if="project_videos_api_url">
        <vuetable ref="vuetable"
          :api-url="project_videos_api_url"
          :fields="fields"
          pagination-path="metadata.pagination"
          :css="css.table"
          :sort-order="sortOrder"
          :multi-sort="true"
          :append-params="moreParams"
          :per-page="100"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onStartLoading"
          @vuetable:loaded="onFinishLoading"
          @vuetable:checkbox-toggled="onCheckboxToggled"
          @vuetable:checkbox-toggled-all="onCheckboxToggledAll"
        ></vuetable>
        <div class="vuetable-pagination">
          <pagination ref="pagination"
            @vuetable-pagination:change-page="onChangePage"
            prev-text="Voltar"
            next-text="Próxima"
            loading-state-path="vimeoImporter/is_loading_videos"
          ></pagination>
        </div>

      </section>

      <hr>

      <section v-if="project_videos_api_url && $refs.vuetable && $refs.vuetable.selectedTo">
        <div class="field">
          <div v-if="!is_importing_videos" class="control">
            <button :disabled="$refs.vuetable.selectedTo.length <= 0" class="button is-primary is-large is-fullwidth" @click.prevent="onClickStartImport">
              <span v-if="$refs.vuetable.selectedTo.length <= 0">Selecione ao menos uma aula para importar</span>
              <span v-else>Iniciar importação de {{ $refs.vuetable.selectedTo.length }} aula(s)</span>
            </button>
          </div>
          <div v-else class="control">
            <progress class="progress is-primary is-large" :value="imported_videos.length" :max="total_selected_to_import_videos"></progress>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import store from '@/store';
  import {mapState, mapGetters} from 'vuex';
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import Pagination from './SerieImporter/Pagination.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

  import CustomActions from './SerieImporter/CustomActions.vue'

  Vue.component('custom-actions', CustomActions)

	export default {

    name: 'SerieImporterPage',

	  components: {
      Vuetable,
      Pagination,
      VuetablePaginationInfo,
    },


    beforeRouteEnter(to, from, next) {
      Promise.all([
        store.dispatch("courses/fetchCourse", to.params.courseSlug),
        store.dispatch("vimeoImporter/fetchProjects")
      ])
        .then(() => next(vm => vm.setSelectedSerie(to.params.serieSlug)));
    },
    beforeRouteLeave(from, to, next) {
      next();
    },

    computed: {
      ...mapState("courses", ["course"]),
      ...mapGetters("courses", ["selected_serie"]),
      ...mapState("vimeoImporter", ["projects", "selected_project", "videos", "is_loading_videos", "selected_videos", "imported_videos"]),
      // ...mapGetters("vimeoImporter", ["project_videos_api_url"])
      project_videos_api_url () {
        let store = this.$store;
        let getterKey = 'vimeoImporter/project_videos_api_url';
        if (store.getters[getterKey]) {
          let accessToken = encodeURIComponent(this.$auth.token());
          return `${store.getters[getterKey]}?token=${accessToken}`
        }
        return null
      },
      css () {
        return {
          table: {
            tableClass: 'table is-fullwidth is-bordered is-striped is-hover ' + (this.$store.state.vimeoImporter.is_loading_videos ? 'is-loading' : ''),
            ascendingIcon: 'fa fa-chevron-up',
            descendingIcon: 'fa fa-chevron-down'
          },
          icons: {
            first: 'fa fa-step-backward',
            prev: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            last: 'fa fa-step-forward',
          },
        };
      }
    },

	  data () {
	    return {
        is_loading_vimeo_project_videos: false,
        is_importing_videos: false,
        total_selected_to_import_videos: 0,
        fields: [
          {
            name: '__sequence',
            title: '#',
            titleClass: 'text-right',
            dataClass: 'text-right'
          },
          {
            name: '__checkbox',
            titleClass: 'text-center',
            dataClass: 'text-center',
          },
          {
            name: 'name',
            title: 'Nome',
            sortField: 'name',
          },
          {
            name: 'link',
            title: 'Link'
          },
          {
            name: 'duration',
            title: 'Duração (s)'
          },
          /*{
            name: '__component:custom-actions',
            title: 'Actions',
            titleClass: 'text-center',
            dataClass: 'text-center'
          }*/
        ],
        sortOrder: [
          { field: 'email', sortField: 'email', direction: 'asc'}
        ],
        moreParams: {}
	    }
    },

    methods: {
      setSelectedSerie(serieSlugOrId) {
        store.commit("courses/setSelectedSerie", serieSlugOrId);
      },
      onSelectVimeoProject(e) {
        let vimeoProjectId = e.target.value;
        this.is_loading_vimeo_project_videos = true;
        store.commit("vimeoImporter/setSelectedProjectId", vimeoProjectId)
        this.is_loading_vimeo_project_videos = false;
        // store.dispatch("vimeoImporter/fetchVideos", vimeoProjectId)
        //   .then(() => console.log(""))
        //   .finally(() => this.is_loading_vimeo_project_videos = false)
      },
      allcap (value) {
        return value.toUpperCase()
      },
      formatNumber (value) {
        return accounting.formatNumber(value, 2)
      },
      formatDate (value, fmt = 'D MMM YYYY') {
        return (value == null)
          ? ''
          : moment(value, 'YYYY-MM-DD').format(fmt)
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      onStartLoading() {
        this.$store.commit('vimeoImporter/setIsLoadingVideos', true);
        this.$Progress.start();
      },
      onFinishLoading() {
        this.$store.commit('vimeoImporter/setIsLoadingVideos', false);
        this.$Progress.finish();
      },
      onClickStartImport() {
        console.log("[onClickStartImport] ", this.$refs.vuetable.selectedTo);
        this.total_selected_to_import_videos = this.selected_videos.length;
        this.is_importing_videos = true;
        this.$store.dispatch("vimeoImporter/importVideos", {course: this.course.slug, serie: this.selected_serie.slug})
          .then(() => {
            this.$swal({type: 'success', title: 'Sucesso!', html: '<p>Videos importados com sucesso.</p>'});
            this.is_importing_videos = false;
            this.$store.commit("vimeoImporter/resetImportedVideos");
          });
      },
      onCheckboxToggled(checked, vimeoVideo) {
        console.log("vuetable:checkbox-toggled ", arguments);
        let mutation = checked ? 'addSelectedVideo' : 'removeSelectedVideo';
        this.$store.commit(`vimeoImporter/${mutation}`, vimeoVideo);
      },
      onCheckboxToggledAll(checked) {
        let els = this.$refs.vuetable.tableData;
        let mutation = checked ? 'addSelectedVideos' : 'removeSelectedVideos';
        if (els) {
          this.$store.commit(`vimeoImporter/${mutation}`, els);
        }
      }
    },
    events: {
      'filter-set' (filterText) {
        this.moreParams = {
          filter: filterText
        }
        Vue.nextTick( () => this.$refs.vuetable.refresh() )
      },
      'filter-reset' () {
        this.moreParams = {}
        Vue.nextTick( () => this.$refs.vuetable.refresh() )
      }
    }
	}
</script>

<style lang="scss">

</style>
