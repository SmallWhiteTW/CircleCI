<template>
  <el-dropdown class="locale_dropdown" @command="setLocale">
    <el-button
      type="primary"
      class="btn btn-info btn-sm mb-0 me-1"
      style="border-radius: 0.5rem"
    >
      {{ locale }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in languages"
          :value="lang.value"
          :key="lang.value"
          :command="lang"
        >
          {{ lang.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useLanguage } from "@/hooks";
import { reactive } from "vue";

const { locale, languages } = useLanguage();
const localDisplay = reactive({
  label: sessionStorage.lang === "en" ? "USA" : "한국인"
})
const setLocale = (newLocale) => {
  locale.value = newLocale.value;
};
</script>

<style>
.locale_dropdown {
  font-weight: 700;
}
</style>
