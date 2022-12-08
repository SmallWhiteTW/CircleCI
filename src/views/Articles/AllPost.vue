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
                {{ $t("All Post") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="row">
              <div class="right" style="padding-right: 100px">
                <button class="btn btn-primary btn-md center" @click="addPost">
                  {{ t("ADD") }}
                </button>
              </div>
            </div>
            <div class="table-responsive p-0" v-loading="state.loading">
              <table
                class="table align-items-center mb-0"
                style="table-layout: fixed; width: 100%"
              >
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Article.Title") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ $t("Article.Author") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Article.DateLastModified") }}
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Article.Categories") }}
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Article.Brief") }}
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("Article.Status") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ t("Article.Edit/Delete") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="article in state.ArticleList" :key="article.AID">
                    <td style="word-wrap: break-word">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="title">{{ article.Title }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="author">{{ article.Author }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ article.MDate }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ article.ACategoryName }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm" style="word-wrap: break-word">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span class="description">{{ article.Description }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ article.StateText }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        style="margin: 3px"
                        @click="editData(article.AID)"
                      >
                        {{ t("SportList.Edit") }}
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        style="margin: 3px"
                        @click="deleteData(article.AID)"
                      >
                        {{ t("SportList.Delete") }}
                      </button>
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
                v-for="ps in state.pageSizeList"
                v-bind:key="ps"
                :command="ps"
              >
                {{ ps }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="col pagination center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="state.dataCount"
          v-model:currentPage="formState.pageIndex"
          v-model:page-size="formState.pageSize"
          @current-change="getArticleData"
        />
      </div>
    </div>
  </div>
  <snackbar :type="snackbarState.type" :msg="snackbarState.msg" />
</template>

<script setup>
import { reactive, onMounted } from "vue";
import backofficeReq from "@/api/backoffice";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import snackbar from "@/components/Snackbar.vue";

const router = useRouter();
const { t } = useI18n();

const formState = reactive({
  pageIndex: 1,
  pageSize: 10,
});
const snackbarState = reactive({
  type: "",
  msg: "",
});
const state = reactive({
  ArticleList: [],
  msg: "",
  dataCount: 10,
  pageSizeList: [5, 10, 15, 20],
  loading: false,
});
onMounted(() => {
  getArticleData();
});

const getArticleData = async () => {
  state.loading = true;
  const payload = {
    pageIndex: formState.pageIndex,
    pageSize: formState.pageSize,
  };
  const { IsSuccess, Data, Msg, DataCount } =
    await backofficeReq.getArticleList(payload);
  if (IsSuccess) {
    let stateText = "";
    Data.forEach((x) => {
      switch (x.State) {
        case 0:
          stateText = t("Article.Delete");
          break;
        case 1:
          stateText = t("Article.NotPublish");
          break;
        case 2:
          stateText = t("Article.Published");
          break;
      }
      x.StateText = stateText;
    });
    state.ArticleList = Data;
    state.dataCount = DataCount;
  } else {
    state.msg = Msg;
  }
  state.loading = false;
};
const editData = async (aid) => {
  router.push({ name: "Editor", query: { aid: aid } });
};
const deleteData = async (id) => {
  let cof = confirm(t("DeleteConfirm"));
  if (cof) {
    state.loading = true;
    const payload = {
      State: 0,
      AID: id,
    };
    const { IsSuccess, Data, Msg, DataCount } =
      await backofficeReq.updateArticle(payload);
    if (IsSuccess) {
      snackbarState.type = "success";
      getArticleData();
    } else {
      state.loading = false;
      snackbarState.type = "error";
      snackbarState.msg = Msg;
    }
  }
};
const addPost = () => {
  router.push({ name: "Editor" });
};
</script>

<style lang="scss" scoped>
.table {
  td {
    white-space: normal;
  }

  th {
    white-space: normal;
  }
}

.title,
.author,
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
