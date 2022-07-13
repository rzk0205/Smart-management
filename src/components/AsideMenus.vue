<template>
  <fragment>
    <template v-if="menus && menus.component">
      <el-menu-item :index="menus.path">
        <i :class="'el-icon-' + menus.icon"></i>
        <span slot="title">{{ menus.label }}</span>
      </el-menu-item>
    </template>
    <template
      v-if="menus && menus.children && menus.children.length > 0 && !menus.path"
    >
      <el-submenu :index="menus.path">
        <template slot="title">
          <i :class="'el-icon-' + menus.icon"></i>
          <span>{{ menus.label }}</span>
        </template>
        <template>
          <div>
            <AsideMenus
              v-for="(childItem, index) in menus.children"
              :key="index"
              :menus="childItem"
            ></AsideMenus>
          </div>
        </template>
      </el-submenu>
    </template>
  </fragment>
</template>
<script>
export default {
  name: 'AsideMenus',
  props: {
    menus: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped></style>
