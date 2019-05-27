<template>
  <nav v-if="tablePagination && tablePagination.last_page > 1" :class="['pagination', location]">
    <a @click="loadPage('prev')"
      :class="['pagination-previous', isOnFirstPage ? css.disabledClass : '', is_loading_page ? 'is-loading' : '']"
      v-html="prevText"
    ></a>
    <a @click="loadPage('next')"
      :class="['pagination-next', isOnLastPage ? css.disabledClass : '', is_loading_page ? 'is-loading' : '']"
      v-html="nextText"
    ></a>
    <ul :class="[css.listClass]">
      <template v-if="totalPagesLessThanWindowSize">
        <li v-for="n in totalPage" :key="n">
          <a @click="loadPage(n)"
            :class="[css.linkClass, isCurrentPage(n) ? css.activeClass : '', is_loading_page ? 'is-loading' : '']"
            v-html="n"
          ></a>
        </li>
      </template>
      <template v-else>
        <li>
          <a @click="loadPage(1)"
            :class="[css.linkClass, isOnFirstPage ? css.disabledClass : '', is_loading_page ? 'is-loading' : '']"
          >1</a>
        </li>
        <li>
          <span :class="css.ellipsisClass">&hellip;</span>
        </li>
        <li v-for="n in windowSize-2" :key="n">
          <a @click="loadPage(windowStart+n)"
            :class="[css.linkClass, isCurrentPage(windowStart+n) ? css.activeClass : '', is_loading_page ? 'is-loading' : '']"
            v-html="windowStart+n">
          </a>
        </li>
        <li>
          <span :class="css.ellipsisClass">&hellip;</span>
        </li>
        <li>
          <a @click="loadPage(totalPage)"
            :class="[css.linkClass, isOnLastPage ? css.disabledClass : '', is_loading_page ? 'is-loading' : '']"
            v-html="totalPage">
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>
<script>
import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'
export default {
  mixins: [PaginationMixin],
  props: {
    location: {
      type: String,
      default: ''
    },
    prevText: {
      type: String,
      default: 'Previous'
    },
    nextText: {
      type: String,
      default: 'Next page'
    },
    loadingStatePath: {
      type: String
    },
    css: {
      type: Object,
      default () {
        return {
          activeClass: 'is-current',
          disabledClass: 'is-disabled',
          listClass: 'pagination-list',
          linkClass: 'pagination-link',
          ellipsisClass: 'pagination-ellipsis'
        }
      }
    }
  },
  computed: {
    totalPagesLessThanWindowSize () {
      return this.totalPage < (this.onEachSide * 2) + 4
    },
    is_loading_page() {
      let objectPath = [];
      if (this.loadingStatePath) {
        if (this.loadingStatePath.indexOf('/') === -1) {
          objectPath.push(this.loadingStatePath);
        } else {
          objectPath = this.loadingStatePath.split('/', 2);
        }
      }
      let stateRoot = this.$store.state;
      objectPath.map((prop, idx, arr) => stateRoot = stateRoot[prop]);

      if (stateRoot) {
        return stateRoot;
      }

      return false;
    }
  }
}
</script>
