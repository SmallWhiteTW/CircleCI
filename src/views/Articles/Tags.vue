<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                {{ $t("Tags.Tags") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="right" style="padding-right: 100px">
              <button class="btn btn-primary btn-md center" @click="addLeague">
                {{ t("ADD") }}
              </button>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Tags.Tags") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Tags.Description") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ $t("Tags.Count") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Tags.Edit") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tag in state.tagData" :key="tag.ATagID">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ tag.ATagName }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ tag.Description }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ tag.ArticleCount }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <button
                            class="btn btn-info btn-sm"
                            style="margin: 3px"
                            @click="editData(tag.ATagID)"
                          >
                            {{ t("Tags.Edit") }}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-1 btn-group">
        <el-dropdown >
          <el-button plain style="border-radius: 0.5rem">
            {{ formState.pageSize }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="ps in formState.pageSizeList"
                v-bind:key="ps"
                :command="ps"
              >
                {{ ps }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="col center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="state.dataCount"
          v-model:currentPage="formState.pageIndex"
          v-model:page-size="formState.pageSize"
          @current-change="pageSelect"
        />
      </div>
    </div>
  </div>
  <!-- Editor Dialog -->
  <el-dialog v-model="state.showDialog" style="width: 500px">
    <h3 class="text-green text-capitalize ps-3" v-if="state.isUpdate">
      {{ t("Tags.Edit") }}
    </h3>
    <h3 class="text-green text-capitalize ps-3" v-else>{{ t("Add") }}</h3>

    <el-form :model="editor" label-width="200px">
      <el-form-item :label="t('Tags.Tags')" :label-width="formLabelWidth">
        <el-input
          v-model="editor.ATagName"
          autocomplete="off"
          style="max-width=50px"
        />
      </el-form-item>
      <el-form-item
        :label="t('Tags.Description')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editor.Description" autocomplete="off" />
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
  <!-- Editor Dialog End -->
  <!-- Snackbar -->
  <div class="position-fixed bottom-1 end-1 z-index-2">
    <MaterialSnackbar
      v-if="state.snackbar === 'success'"
      :title="state.msg"
      :icon="{ component: 'done', color: 'white' }"
      color="success"
      :close-handler="closeSnackbar"
    />
    <MaterialSnackbar
      v-if="state.snackbar === 'error'"
      :title="state.msg"
      :icon="{ component: 'campaign', color: 'white' }"
      color="danger"
      :close-handler="closeSnackbar"
    />
  </div>
  <!-- Snackbar End -->
</template>

<script setup>
import { reactive, onMounted } from "vue";
import backofficeReq from "@/api/backoffice";
import { useI18n } from "vue-i18n";
import { MaterialSnackbar } from "@/components/material";

const { t } = useI18n();

const formState = reactive({
  pageIndex: 1,
  pageSize: 10,
  pageSizeList: [5, 10, 15, 20],
});
const state = reactive({
  tagData: [],
  msg: "",
  dataCount: 10,
  isUpdate: false,
  showDialog: false,
  snackbar: "",
});
const editor = reactive({
  ATagID: 0,
  ATagName: "",
  Description: "",
});
onMounted(() => {
  getCategoryData();
});

const getCategoryData = async () => {
  const payload = {
    pageIndex: formState.pageIndex,
    pageSize: formState.pageSize,
  };
  const { IsSuccess, Data, Msg } = await backofficeReq.getArticleTagList(
    payload
  );
  if (IsSuccess) {
    state.tagData = Data;
  } else {
    state.msg = Msg;
  }
  console.log(state.tagData);
};

const editData = (ATagID) => {
  state.isUpdate = true;
  state.showDialog = true;
  let tg = state.tagData.filter((x) => x.ATagID === ATagID)[0];
  editor.ATagID = ATagID;
  editor.ATagName = tg.ATagName;
  editor.Description = tg.Description;
};

const cancel = () => {
  editor.ATagID = "";
  editor.ATagName = "";
  editor.Description = "";
  editor.State = "";
  state.showDialog = false;
};

const confirm = async () => {
  let payload = {
    ATagName: editor.ATagName,
    Description: editor.Description,
    Slug: editor.Slug,
  };
  if (state.isUpdate) {
    payload.ATagID = editor.ATagID;
  }
  const { IsSuccess, Msg } = await backofficeReq.updateArticleTag(payload);
  if (IsSuccess) {
    state.snackbar = "success";
    state.showDialog = false;
    getCategoryData();
  } else {
    state.snackbar = "error";
    state.showDialog = false;
    state.msg = Msg;
  }
};

const addLeague = () => {
  state.isUpdate = false;
  state.showDialog = true;
  editor.ATagName = "";
  editor.Description = "";
};
</script>

<style scoped>
.table td,
.table th {
  white-space: normal !important;
}
</style>
