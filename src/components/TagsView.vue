<template>
  <div class="tagsView">
    <ul class="tags-view-list">
      <li
        class="tags-view-item"
        @click="handleSelectTag(item.path)"
        :class="{ active: $route.path === item.path }"
        v-for="(item, index) in tagsView"
        :key="index"
      >
        {{ item.meta.title }}
        <span v-if="!index == 0" @click.stop="handleCloseTag(item.path, index)"
          >×</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { isTags } from '../utils/isTags'
export default {
  name: 'TagsView',
  data() {
    return {}
  },
  methods: {
    handleSelectTag(path) {
      this.$router.push(path)
    },
    handleCloseTag(routepath, index) {
      this.$store.commit('tagsView/removeTagItem', index)
      const tagsView = this.$store.getters.tagsView
      if (routepath === this.$route.path) {
        const path = tagsView[index]
          ? tagsView[index].path
          : tagsView[tagsView.length - 1].path
        this.$router.push(path)
      }
    }
  },
  computed: {
    tagsView() {
      return this.$store.getters.tagsView
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (isTags(to.path)) return
        const { meta, path } = to
        this.$store.dispatch('tagsView/setTagsView', { meta, path })
      },
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
.tagsView {
  width: 100%;
  overflow-x: auto;
  .tags-view-list {
    margin-bottom: 5px;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      background: #fff;
      border: 1px solid #e6a23c;
      color: #e6a23c;
      padding: 0 10px;
      font-size: 12px;
      margin-left: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        background-color: #e6a23c;
      }
    }
  }
}
</style>
