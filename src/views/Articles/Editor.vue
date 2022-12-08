<template>
  <div class="container-fluid py-4" v-loading="state.loading">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                {{ $t("ArticleEditor.AddNewPost") }}
              </h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="right">
              <button
                class="btn btn-secondary btn-md center"
                style="margin: 10px"
                @click="saveAsDraft"
              >
                {{ t("ArticleEditor.SaveAsDraft") }}
              </button>
              <button
                class="btn btn-info btn-md center"
                style="margin: 10px"
                @click="preview"
              >
                {{ t("ArticleEditor.Preview") }}
              </button>
              <button
                class="btn btn-primary btn-md center"
                style="margin: 10px"
                @click="publish"
              >
                <span v-if="state.isModify">{{
                  t("ArticleEditor.ModifyPublishedPost")
                }}</span>
                <span v-else>{{ t("ArticleEditor.Publish") }}</span>
              </button>
            </div>
            <div class="table-responsive p-0">
              <div class="row">
                <div class="col center">
                  <Editor
                    v-model="state.content"
                    :init="state.tinyInitPara"
                  ></Editor>
                </div>
                <div class="col">
                  <div class="row left">
                    <h4>{{ t("ArticleEditor.Article") }}</h4>
                  </div>
                  <div class="row">
                    <el-form :model="article" label-width="200px">
                      <el-form-item
                        :label="t('ArticleEditor.Title')"
                        :label-width="formLabelWidth"
                      >
                        <el-input v-model="article.title" autocomplete="off" />
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Author')"
                        :label-width="formLabelWidth"
                      >
                        <el-input v-model="article.author" autocomplete="off" />
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Categories')"
                        :label-width="formLabelWidth"
                      >
                        <el-select
                          v-model="article.categories"
                          class="m-2"
                          placeholder="Select"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in state.categoriesData"
                            :key="item.ACategoryID"
                            :label="item.ACategoryName"
                            :value="item.ACategoryID"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Sport')"
                        :label-width="formLabelWidth"
                      >
                        <el-select
                          v-model="article.sportID"
                          class="m-2"
                          placeholder="Select"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in state.sportList"
                            :key="item.SportID"
                            :label="item.SportName"
                            :value="item.SportID"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Tags')"
                        :label-width="formLabelWidth"
                      >
                        <el-select-v2
                          v-model="article.tags"
                          :options="state.tagsData"
                          placeholder="Please select"
                          style="width: 100%"
                          multiple
                        />
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Description')"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="article.description"
                          type="textarea"
                          autocomplete="off"
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="row left">
                    <h4>{{ t("ArticleEditor.MetaData") }}</h4>
                  </div>
                  <div class="row">
                    <el-form :model="meta" label-width="200px">
                      <el-form-item
                        :label="t('ArticleEditor.Title')"
                        :label-width="formLabelWidth"
                      >
                        <el-input v-model="meta.title" autocomplete="off" />
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Keywords')"
                        :label-width="formLabelWidth"
                      >
                        <el-input v-model="meta.keywords" autocomplete="off" />
                      </el-form-item>
                      <el-form-item
                        :label="t('ArticleEditor.Description')"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="meta.description"
                          type="textarea"
                          autocomplete="off"
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="row">
                    <el-form :model="meta" label-width="200px">
                      <el-form-item
                        :label="t('ArticleEditor.Thumbnail')"
                        :label-width="formLabelWidth"
                      >
                        <el-upload
                          ref="uploadRef"
                          class="upload-demo"
                          :auto-upload="false"
                          :on-change="onUploadChange"
                        >
                          <template #trigger>
                            <el-button type="primary">{{
                              t("ArticleEditor.SelectFile")
                            }}</el-button>
                          </template>
                          <template #tip>
                            <div class="el-upload__tip">
                              {{ t("ArticleEditor.UploadMsg") }}
                            </div>
                          </template>
                        </el-upload>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  <el-dialog
    v-model="state.showPreview"
    style="z-index: 99999; background: #222"
    fullscreen
  >
    <div class="preview" style="background-color: rgba(255, 255, 255, 0.3)">
      <div
        class="row"
        style="font: 12px/1.33 Roboto; text-align: left; color: #ffffff40"
      >
        <span>{{ article.author }}</span>
      </div>
      <div class="row">
        <h3 style="color: white">{{ article.title }}</h3>
      </div>
      <div
        class="row"
        style="
          font: 24px/1.25 Roboto;
          letter-spacing: 0.18px;
          text-align: left;
          color: #fff;
        "
      >
        <span> {{ article.description }} </span>
      </div>
      <div
        class="row"
        v-html="state.Content"
        id="content"
        style="font: 12px; color: whitesmoke"
      ></div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import backofficeReq from "@/api/backoffice";
import { useI18n } from "vue-i18n";
import UploadInstance from "element-plus";
import { useRouter } from "vue-router";
import { MaterialSnackbar } from "@/components/material";
import Editor from "@tinymce/tinymce-vue";

const formLabelWidth = "180px";
const router = useRouter();
const { t } = useI18n();
const uploadRef = ref(UploadInstance);
const state = reactive({
  categoriesData: [],
  tagsData: [],
  snackbar: "",
  loading: false,
  msg: "",
  editKey: "",
  init: true,
  oEditor: true,
  isModify: false,
  sportList: [],
  showPreview: false,
  content: "",
  tinyInitPara: {
    height: 600,
    menubar: true,
    plugins: "tinydrive link image media",
    toolbar: [
      "undo redo",
      "styleselect",
      "bold italic underline forecolor backcolor",
      "alignleft aligncenter alignright alignjustify",
      "bullist numlist outdent indent",
      "insertfile",
      "link image media",
    ].join(" | "),
    //tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
    setup: (editor) => {
      editor.ui.registry.addButton("custom", {
        //text: 'Custom pick image',
        onAction: () => {
          editor.plugins.tinydrive
            .pick({
              filetypes: ["image"],
            })
            .then((result) => {
              result.files.forEach((file) => {
                const img = editor.dom.createHTML("img", { src: file.url });
                editor.insertContent(img);
              });
            });
        },
      });
    },
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "*/*");

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          /* call the callback and populate the Title field with the file name */
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });

      input.click();
    },
  },
});
const article = reactive({
  title: "",
  author: "",
  categories: [],
  tags: [],
  description: "",
  sportID:"",
  aid: ""
})

const meta = reactive({
  title: "",
  keywords: "",
  description: "",
  thumbnail: "",
});

onMounted(() => {
  getCategoryData();
  getTagsData();
  getSportTypes();

  if (parseInt(new URL(window.location.href).searchParams.get("aid")) > 0) {
    getArticle();
  }
});

const sub = () => {
  var res = tinymce.activeEditor.getContent();
  console.log(res);
};

const getCategoryData = async () => {
  const payload = {};
  const { IsSuccess, Data, Msg } = await backofficeReq.getArticleCategoryList(
    payload
  );
  if (IsSuccess) {
    state.categoriesData = Data;
  } else {
    state.msg = Msg;
  }
};

const getTagsData = async () => {
  const payload = {};
  const { IsSuccess, Data, Msg } = await backofficeReq.getArticleTagList(
    payload
  );
  if (IsSuccess) {
    Data.forEach((x) => {
      state.tagsData.push({ value: x.ATagName, label: x.ATagName });
    });
  } else {
    state.msg = Msg;
  }
};

const onUploadChange = (file) => {
  var reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = function (e) {
    meta.thumbnail = this.result;
  };
};
const preview = async () => {
  state.showPreview = true;
  state.Content = tinymce.activeEditor.getContent();
};

const saveAsDraft = async () => {
  state.loading = true;
  const payload = {
    Title: article.title,
    Author: article.author,
    ACategoryID: article.categories,
    SportID: article.sportID,
    Content: tinymce.activeEditor.getContent(),
    Tags: article.tags.toString(),
    Description: article.description,
    MetaTitle: meta.title,
    MetaKeyword: meta.keywords,
    MetaDescription: meta.description,
    PreviewContent: meta.thumbnail,
    State: 1,
  };
  if(article.aid !== ""){
    payload.AID = article.aid;
  };
  pushToServer(payload);
};

const publish = async () => {
  state.loading = true;
  const payload = {
    Title: article.title,
    Author: article.author,
    ACategoryID: article.categories,
    SportID: article.sportID,
    Content: tinymce.activeEditor.getContent(),
    Tags: article.tags.toString(),
    Description: article.description,
    MetaTitle: meta.title,
    MetaKeyword: meta.keywords,
    MetaDescription: meta.description,
    PreviewContent: meta.thumbnail,
    State: 2,
  };
  if(article.aid !== ""){
    payload.AID = article.aid;
  };
  pushToServer(payload);
};
const pushToServer = async (payload) => {
  const { IsSuccess, Data, Msg } = await backofficeReq.updateArticle(payload);
  if (IsSuccess) {
    state.categoriesData = Data;
    router.push({ name: "AllPost" });
  } else {
    state.msg = Msg;
    state.snackbar = "error";
  }
  state.loading = false;
};

const getArticle = async () => {
  state.loading = true;
  let aid = new URL(window.location.href).searchParams.get("aid")
  article.aid = aid
  const payload = {
    AID: aid,
  };
  const { IsSuccess, Data, Msg } = await backofficeReq.getArticle(payload);

  if (IsSuccess) {
    article.title = Data.Title;
    article.author = Data.Author;
    article.categories = Data.ACategoryID;
    article.tags = Data.Tags.split(",");
    article.description = Data.Description;
    article.sportID = Data.sportID;
    meta.title = Data.MetaTitle;
    meta.keywords = Data.MetaKeyword;
    meta.description = Data.MetaDescription;
    meta.thumbnail = Data.PreviewContent;
    tinymce.activeEditor.setContent(Data.Content);
    state.isModify = Data.State === 2;
  }
  state.loading = false;
};

const openEditor = () => {
  location.reload();
};

window.onload = function () {
  if (document.getElementById("editor").style.display !== "none") {
    state.oEditor = true;
  } else {
    state.oEditor = false;
  }
};

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
</script>
<style>
.tox-notifications-container {
  display: none;
}
.tox-statusbar__branding {
  display: none;
}
.tox-statusbar__path {
  display: none !important;
}
.tox-promotion {
  display: none !important;
}
</style>
