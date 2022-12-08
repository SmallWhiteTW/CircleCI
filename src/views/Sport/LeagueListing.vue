<template>
  <div class="row">
    <ul class="breadcrumbs">
      <li class="first"><a href="#" class="icon-home"></a></li>
      <li>
        <a href="#">{{ $t("Home") }}</a>
      </li>
      <li class="last active">
        <a href="#">{{ state.loc }}</a>
      </li>
    </ul>
  </div>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                {{ $t("League Listing") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="right" style="padding-right: 100px">
              <button class="btn btn-primary btn-md center" @click="addLeague">
                {{ t("ADD") }}
              </button>
            </div>
            <div class="table-responsive p-0" v-loading="state.loading">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("LeagueListing.Sport") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("LeagueListing.Sport") }} ( KO )
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ $t("LeagueListing.Country/Region") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ $t("LeagueListing.Country/Region") }} ( KO )
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("LeagueListing.Display Order") }}
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("LeagueListing.Active/Inactive") }}
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="league in state.LeagueData" :key="league.LeagueID">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ league.LeagueName }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ league.LeagueNameKO }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ league.CountryName }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ league.CountryNameKO }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ league.Sort }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <div v-if="league.State === 1">
                        <span
                          class="badge badge-sm bg-gradient-success"
                          @click="updateState(league.LeagueID, 0)"
                          >Active</span
                        >
                      </div>
                      <div v-else>
                        <span
                          class="badge badge-sm bg-gradient-secondary"
                          @click="updateState(league.LeagueID, 1)"
                          >Blocked</span
                        >
                      </div>
                    </td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        style="margin: 3px"
                        @click="editData(league.LeagueID)"
                      >
                        {{ t("LeagueListing.Edit") }}
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        style="margin: 3px"
                        @click="deleteData(league.LeagueID)"
                      >
                        {{ t("LeagueListing.Delete") }}
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
      {{ t("LeagueListing.Edit") }}
    </h3>
    <h3 class="text-green text-capitalize ps-3" v-else>{{ t("Add") }}</h3>

    <el-form :model="editor" label-width="200px">
      <el-form-item
        :label="t('LeagueListing.Sport')"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editor.LeagueName"
          autocomplete="off"
          style="max-width=50px"
        />
      </el-form-item>
      <el-form-item
        :label="t('LeagueListing.Sport ( KO )')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editor.LeagueNameKO" autocomplete="off" />
      </el-form-item>
      <el-form-item
        :label="t('LeagueListing.Country/Region')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editor.CountryName" autocomplete="off" />
      </el-form-item>
      <el-form-item
        :label="t('LeagueListing.Country/Region ( KO )')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editor.CountryNameKO" autocomplete="off" />
      </el-form-item>
      <el-form-item
        :label="t('LeagueListing.Display Order')"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editor.Sort" autocomplete="off" />
      </el-form-item>
      <el-form-item
        :label="t('LeagueListing.Active/Inactive')"
        :label-width="formLabelWidth"
      >
        <div class="d-flex flex-row align-items-center gap-3">
          <el-switch
            id="league_state"
            :model-value="editor.State === 1"
            @click="editor.State = (editor.State + 1) % 2"
          />

          <label
            v-if="editor.State === 0"
            for="league_state"
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
  leagueList: [],
  LeagueData: [],
  loc: new URL(window.location.href).searchParams.get("loc"),
  sportid: new URL(window.location.href).searchParams.get("id"),
  msg: "",
  dataCount: 10,
  isUpdate: false,
  showDialog: false,
  snackbar: "",
  loading: false,
});
const editor = reactive({
  LeagueID: 0,
  LeagueName: "",
  LeagueNameKO: "",
  CountryName: "",
  CountryNameKO: "",
  Sort: "",
  Active: false,
  State: 0,
});
onMounted(() => {
  getLeagueData();
});

const getLeagueData = async () => {
  state.loading = true;
  const payload = {
    SportID: state.sportid,
    pageIndex: formState.pageIndex,
    pageSize: formState.pageSize,
  };
  const { IsSuccess, Data, Msg } = await backofficeReq.getLeagueData(payload);
  if (IsSuccess) {
    state.LeagueData = Data;
  } else {
    state.msg = Msg;
  }
  state.loading = false;
};

const editData = (LeagueID) => {
  state.isUpdate = true;
  state.showDialog = true;
  let leag = state.LeagueData.filter((x) => x.LeagueID === LeagueID)[0];
  console.log(leag);
  editor.LeagueID = LeagueID;
  editor.LeagueName = leag.LeagueName;
  editor.LeagueNameKO = leag.LeagueNameKO;
  editor.CountryName = leag.CountryName;
  editor.CountryNameKO = leag.CountryNameKO;
  editor.Sort = leag.Sort;
  editor.Active = leag.Active;
  editor.State = leag.State;
};

const cancel = () => {
  editor.LeagueName = "";
  editor.LeagueNameKO = "";
  editor.CountryName = "";
  editor.CountryNameKO = "";
  editor.Sort = "";
  editor.Active = false;
  editor.State = "";
  state.showDialog = false;
};

const confirm = async () => {
  let payload = {
    LeagueName: editor.LeagueName,
    LeagueNameKO: editor.LeagueNameKO,
    CountryName: editor.CountryName,
    CountryNameKO: editor.CountryNameKO,
    Sort: editor.Sort,
    Active: editor.Active,
    State: editor.State,
  };
  if (state.isUpdate) {
    payload.LeagueID = editor.LeagueID;
  }
  const { IsSuccess, Msg } = await backofficeReq.updateSportLeague(payload);
  if (IsSuccess) {
    state.snackbar = "success";
    state.showDialog = false;
    getLeagueData();
  } else {
    state.snackbar = "error";
    state.showDialog = false;
    state.msg = Msg;
  }
};

const addLeague = () => {
  state.isUpdate = false;
  state.showDialog = true;
  editor.LeagueName = "";
  editor.LeagueNameKO = "";
  editor.CountryName = "";
  editor.CountryNameKO = "";
  editor.Sort = "";
  editor.Active = false;
  editor.State = 0;
};
</script>

<style scoped></style>

<style>
.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #66bb6a !important;
  border-radius: 99em !important;
}
</style>
