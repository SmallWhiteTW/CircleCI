<template>
  <el-dialog v-model="showDialog" style="width: 500px">
    <h3 class="text-green text-capitalize ps-3" v-if="props.isUpdate">
      {{ t("SportList.Edit") }}
    </h3>
    <h3 class="text-green text-capitalize ps-3" v-else>{{ t("Add") }}</h3>

    <el-form :model="formState">
      <el-form-item :label="t('SportList.Sport')" :label-width="formLabelWidth">
        <el-input
          v-model="formState.SportName"
          autocomplete="off"
          style="max-width=100px"
        />
      </el-form-item>
      <el-form-item
        :label="t('SportList.Sport ( KO )')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formState.SportNameKO" autocomplete="off" />
      </el-form-item>
      <el-form-item
        :label="t('SportList.Display Order')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formState.Sort" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="t('SportList.State')" :label-width="formLabelWidth">
        <div class="d-flex flex-row align-items-center gap-3">
          <el-switch
            id="sport_state"
            :model-value="formState.State === 1"
            @click="formState.State = (formState.State + 1) % 2"
          />

          <label
            v-if="formState.State === 0"
            for="sport_state"
            class="badge badge-sm bg-gradient-secondary m-0"
            style="cursor: pointer"
          >
            {{ t("Blocked") }}
          </label>

          <label
            v-else
            for="sport_state"
            class="badge badge-sm bg-gradient-success m-0"
            style="cursor: pointer"
          >
            {{ t("Active") }}
          </label>
        </div>
      </el-form-item>
    </el-form>

    <div class="center">
      <button
        class="btn btn-outline-info btn-sm"
        style="margin: 10px"
        @click="cancel"
      >
        {{ t("Cancel") }}
      </button>
      <button
        class="btn btn-outline-success btn-sm"
        style="margin: 10px"
        @click="confirm"
      >
        {{ t("Submit") }}
      </button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const formLabelWidth = "100px";

const { t } = useI18n();

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  model: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const showDialog = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit("update:modelValue", value);
  },
});

const formState = ref({});

const cancel = (evt) => {
  emit("cancel", evt);
};
const confirm = (evt) => {
  emit("confirm", evt, formState.value);
};

onMounted(() => {
  formState.value = props.model;
});

watch(
  props.model,
  (newModel) => {
    formState.value = newModel;
  },
  { deep: true }
);
</script>
