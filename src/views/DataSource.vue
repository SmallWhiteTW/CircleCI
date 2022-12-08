<template>
  <div id="app">
    <div class="card mt-4">
      <div class="card-header pb-0 p-3">
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <h3 class="mb-0">{{ t("File") }} {{ t("Upload") }}</h3>
          </div>
        </div>
      </div>
      <div class="card-body p-3">
        <div class="row">
          <h6>{{ t("Platform") }} :</h6>
        </div>
        <div class="row">
          <div
            class="col-2"
            v-for="(platform, index) in state.platformList"
            v-bind:key="platform.PlatFormID"
          >
            <div class="custom-control custom-radio">
              <input
                type="radio"
                :id="'customRadio0' + index"
                :name="'customRadio2' + index"
                class="custom-control-input"
                v-model="state.platformType"
                :value="platform.PlatFormID"
              />
              <label class="custom-control-label" :for="'customRadio0' + index">
                {{ platform.PlatFormName }}
              </label>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <h6>{{ t("Data Type") }} :</h6>
        </div>
        <div class="row">
          <div class="col-2">
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="dataSourceType1"
                name="dataSourceType1"
                class="custom-control-input"
                v-model="state.dataSourceType"
                :value="1"
              />
              <label class="custom-control-label" :for="'customRadio0' + index">
                {{ t("Header") }}
              </label>
            </div>
          </div>
          <div class="col-2">
            <div class="custom-control custom-radio">
              <input
                type="radio"
                id="dataSourceType2"
                name="dataSourceType2"
                class="custom-control-input"
                v-model="state.dataSourceType"
                :value="2"
              />
              <label class="custom-control-label" :for="'customRadio0' + index">
                {{ t("Detail") }}
              </label>
            </div>
          </div>
        </div>
        <br />
        <input ref="$file" type="file" @change="fileChange" accept="text/csv" />
        <a @click="upload" class="btn btn-sm mb-0 me-1 bg-gradient-success">
          {{ t("Upload") }}
        </a>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-1 end-1 z-index-2">
    <MaterialSnackbar
      v-if="state.snackbar === 'success'"
      title="File Updated"
      :description="state.message"
      :icon="{ component: 'done', color: 'white' }"
      color="success"
      :close-handler="closeSnackbar"
    />
    <MaterialSnackbar
      v-if="state.snackbar === 'error'"
      title="File Update Error"
      :description="state.message"
      :icon="{ component: 'campaign', color: 'white' }"
      color="danger"
      :close-handler="closeSnackbar"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import backofficeReq from "@/api/backoffice";
import { MaterialSnackbar } from "@/components/material";

const { t } = useI18n();

const $file = ref(null);
const state = reactive({
  loading: false,
  submitting: false,

  selected: "",
  snackbar: "",
  message: "",
  platformList: [],
  platformType: 2,
  dataSourceType: 1,

  formData: new FormData(),
  fileSoure: null,
});

const getPlatformList = async () => {
  try {
    state.loading = true;

    const { IsSuccess, Msg, Data } = await backofficeReq.getPlatForms();

    if (IsSuccess) {
      state.platformList = Data;
    } else {
      throw new Error(Msg);
    }
  } catch (err) {
    console.error(err.name, err.message);
  } finally {
    state.loading = false;
  }
};

const fileChange = (evt) => {
  const source = evt.target.files[0]; // 放進上傳的檔案
  state.fileSoure = source ?? null;
};

const upload = () => {
  if (state.fileSoure === null) {
    // 你沒選擇檔案
    toastMessage("Please select a csv file.", false);
  } else {
    const formData = new FormData();

    formData.append("iFile", state.fileSoure);
    formData.append("PlatFormID", state.platformType);
    formData.append("DataSourceType", state.dataSourceType);

    submit(formData);
  }
};

const submit = async (formData) => {
  try {
    state.submitting = true;
    const { IsSuccess, Msg } = await backofficeReq.uploadBetRecord(formData);

    if (IsSuccess) {
      toastMessage("Update Success");
      clearSource();
    } else {
      throw new Error(Msg);
    }
  } catch (err) {
    console.error(err.name, err.message);
    toastMessage(err.message, false);
  } finally {
    state.submitting = false;
  }
};

const clearSource = () => {
  state.fileSoure = null;
  $file.value.value = null;
};

const toastMessage = (msg, isSuccess = true) => {
  state.snackbar = isSuccess ? "success" : "error";
  state.message = msg;
};

const closeSnackbar = () => {
  state.snackbar = "";
  state.message = "";
};

onMounted(() => {
  getPlatformList();
});
</script>

<style scoped></style>
