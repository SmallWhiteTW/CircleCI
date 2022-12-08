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
                {{ $t("Member List") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("UserList.UserName") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      {{ $t("UserList.Email") }}
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("UserList.Country") }}
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      {{ $t("UserList.Status") }}
                    </th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in state.userData" :key="user.UserID">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ user.UserName }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ user.EMail }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <span>{{ user.CountryName }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <div v-if="user.Active">
                        <span
                          class="badge badge-sm bg-gradient-success"
                          @click="updateState(user.UserID, 0)"
                          >Active</span
                        >
                      </div>
                      <div v-else>
                        <span
                          class="badge badge-sm bg-gradient-secondary"
                          @click="updateState(user.UserID, 1)"
                          >Blocked</span
                        >
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
        <el-dropdown @command="setSize">
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
</template>

<script setup>
import { reactive, onMounted } from "vue";
import backofficeReq from "@/api/backoffice";

const formState = reactive({
  pageIndex: 1,
  pageSize: 10,
});
const state = reactive({
  userData: [],
  dataCount: 0,
  pageCount: 1,
  pageActive: [],
  pageSizeList: [5, 10, 15, 20],
});

const getMemberList = () => {
  backofficeReq.getUserList(formState).then((res) => {
    if (res.IsSuccess) {
      state.userData = res.Data;
      state.userData.forEach(
        (u) => (
          (u.Active = u.State === 1),
          (u.CountryName = u.Country === 0 ? "USA" : "KR")
        )
      );
      state.dataCount = res.DataCount;
      state.pageCount = Math.ceil(res.DataCount / formState.pageSize);
      state.pageActive = [];
      for (let i = 0; i < state.pageCount; i++) {
        state.pageActive.push(i === formState.pageIndex - 1);
      }
    }
  });
};

const updateState = (userid, state) => {
  const payload = { state, UserID: userid };

  backofficeReq.updateUserInfo(payload).then((res) => {
    if (res.IsSuccess) {
      getMemberList();
    }
  });
};

const pageSelect = (n) => {
  formState.pageIndex = n;
  getMemberList();
};

const setSize = (n) => {
  formState.pageIndex = 1;
  formState.pageSize = n;
  getMemberList();
};

onMounted(() => {
  getMemberList();
});
</script>

<style scoped>
.pagination {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #66bb6a !important;
  border-radius: 99em !important;
}
</style>
