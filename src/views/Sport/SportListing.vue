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
                {{ t("Sport List") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="right" style="padding-right: 100px">
              <button class="btn btn-primary btn-md center" @click="addSport">
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
                      {{ t("SportList.Sport") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ t("SportList.Sport ( KO )") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ t("SportList.Display Order") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ t("SportList.Active/Inactive") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ t("SportList.Edit/Delete") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sport in state.sportList" :key="sport.SportID">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>
                            <el-link
                              type="primary"
                              :href="`leaguelisting?loc=${sport.SportName}&id=${sport.SportID}`"
                            >
                              {{ sport.SportName }}
                            </el-link>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ sport.SportNameKO }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ sport.Sort }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex flex-row align-items-center gap-3">
                        <el-switch
                          id="sport_state"
                          :model-value="sport.State === 1"
                          @click="updateState(sport, (sport.State + 1) % 2)"
                        />

                        <label
                          v-if="sport.State === 0"
                          for="sport_state"
                          class="badge badge-sm bg-gradient-secondary m-0"
                          style="cursor: pointer"
                        >
                          Blocked
                        </label>

                        <label
                          v-else
                          for="sport_state"
                          class="badge badge-sm bg-gradient-success m-0"
                          style="cursor: pointer"
                        >
                          Active
                        </label>
                      </div>
                    </td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        style="margin: 3px"
                        @click="editData(sport.SportID)"
                      >
                        {{ t("SportList.Edit") }}
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
  </div>

  <EditDialog
    v-model="state.showDialog"
    :model="formState"
    :is-update="state.isUpdate"
    @cancel="onCancel"
    @confirm="onConfirm"
  />

  <div class="position-fixed bottom-1 end-1 z-index-2">
    <MaterialSnackbar
      v-if="state.snackbar === 'success'"
      :title="state.message"
      :icon="{ component: 'done', color: 'white' }"
      color="success"
      :close-handler="closeSnackbar"
    />
    <MaterialSnackbar
      v-if="state.snackbar === 'error'"
      :title="state.message"
      :icon="{ component: 'campaign', color: 'white' }"
      color="danger"
      :close-handler="closeSnackbar"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { MaterialSnackbar } from "@/components/material";
import backofficeReq from "@/api/backoffice";
import { hasData } from "@/utils";
import EditDialog from "./EditDialog.vue";

const { t } = useI18n();

const INIT_FORM = {
  SportID: null,
  SportName: "",
  SportNameKO: "",
  Sort: "",
  State: 1,
};
const formState = reactive({ ...INIT_FORM });
const state = reactive({
  loading: false,
  sportList: [],

  submitting: false,

  snackbar: "",
  message: "",
  showDialog: false,
  isUpdate: false,
});

const getSportTypes = async () => {
  state.loading = true;
  try {
    state.loading = true;
    const { IsSuccess, Data, Msg } = await backofficeReq.getSportTypes();

    if (IsSuccess) {
      state.sportList = Data ?? [];
    } else {
      throw new Error(Msg);
    }
  } catch (err) {
    console.error(err.name, err.message);
    state.sportList = [];
  } finally {
    state.loading = false;
  }
};

const updateState = (sport, newState) => {
  const payload = { ...sport, State: newState };
  updateSport(payload);
};

const updateSport = async (payload) => {
  try {
    state.submitting = true;

    const { IsSuccess, Msg } = await backofficeReq.updateSportType(payload);

    if (IsSuccess) {
      state.snackbar = "success";
      state.message = Msg ?? "Success";

      getSportTypes();
    } else {
      throw new Error(Msg);
    }
  } catch (err) {
    console.error(err.name, err.message);

    state.snackbar = "error";
    state.message = err.message;
  } finally {
    state.submitting = false;
  }
};

const editData = (id) => {
  state.isUpdate = true;
  const data = state.sportList.find((x) => x.SportID === id);

  if (hasData(data)) {
    console.log(data);
    formState.SportID = data.SportID;
    formState.SportName = data.SportName;
    formState.SportNameKO = data.SportNameKO;
    formState.Sort = data.Sort;
    formState.State = data.State;
    state.showDialog = true;
  }
};

const addSport = () => {
  state.isUpdate = false;
  state.showDialog = true;
};

const onCancel = () => {
  formState.SportID = INIT_FORM.SportID;
  formState.SportName = INIT_FORM.SportName;
  formState.SportNameKO = INIT_FORM.SportNameKO;
  formState.Sort = INIT_FORM.Sort;
  formState.State = INIT_FORM.State;
  state.showDialog = false;
};

const onConfirm = (evt, formData) => {
  updateSport(formData);
  state.showDialog = false;
};

const closeSnackbar = () => {
  state.snackbar = null;
};

onMounted(() => {
  getSportTypes();
});
</script>

<style scoped>
.center {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right {
  flex-shrink: 0;
  display: flex;
  align-items: right;
  justify-content: right;
}
</style>
