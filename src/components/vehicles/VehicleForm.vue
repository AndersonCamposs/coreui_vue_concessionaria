<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import {
  cilPencil,
  cilListNumbered,
  cilAt,
  cilCalendar,
  cilTag,
  cilFlagAlt,
  cilCode,
  cilClipboard,
  cilCalendarCheck,
  cilPaint,
  cilSettings,
  cilDollar,
  cilSpeedometer,
  cilCamera,
  cilTrash,
} from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CFormInput, CFormSelect, CFormTextarea, CInputGroup } from '@coreui/vue';
import api from '@/services/api.js';

const emit = defineEmits(['showDeleteModal', 'onSubmit']);
const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
const files = ref([]);
const brandsList = ref([]);
const categoriesList = ref([]);

const loadBrandsList = async () => {
  try {
    const { data } = await api.get('/brand');
    brandsList.value = data;
  } catch (e) {
    console.log(e.message);
  }
};

const loadCategoriesList = async () => {
  try {
    const { data } = await api.get('/category');
    categoriesList.value = data;
  } catch (e) {
    console.log(e.message);
  }
};

onMounted(async () => {
  try {
    await loadBrandsList();
    await loadCategoriesList();
  } catch (e) {
    console.log(e.message);
  }
});

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  const previewFiles = selectedFiles.map((file) => {
    const preview = URL.createObjectURL(file);
    return {
      file,
      preview,
      name: file.name,
    };
  });

  files.value.push(...previewFiles);
};

const removeFile = (index) => {
  URL.revokeObjectURL(files.value[index].preview); // Libera o recurso da memória
  files.value.splice(index, 1);
};
</script>

<template>
  <CForm @submit.prevent="emit('onSubmit')">
    <div class="row mb-3">
      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"> Marca </CInputGroupText>
          <CFormSelect aria-label="Select da marca do veículo">
            <option v-for="brand in brandsList" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilFlagAlt" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Modelo"
            aria-label="Modelo"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"> Categoria </CInputGroupText>
          <CFormSelect aria-label="Select da categoria do veículo">
            <option v-for="category in categoriesList" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilListNumbered" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="N° Chassi"
            aria-label="N° Chassi"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilClipboard" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Placa"
            aria-label="Placa"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilCalendarCheck" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Ano"
            aria-label="Ano"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilPaint" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Cor"
            aria-label="Cor"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilSettings" />
          </CInputGroupText>
          <CFormSelect>
            <option value="MANUAL">MANUAL</option>
            <option value="AUTOMATIC">AUTOMÁTICO</option>
          </CFormSelect>
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilDollar" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Valor"
            aria-label="Valor"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilSpeedometer" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Valor do odômetro"
            aria-label="Valor do odômetro"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilPaint" />
          </CInputGroupText>
          <CFormTextarea
            required
            rows="1"
            placeholder="Descrição"
            aria-label="Descrição"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-4 col-md-6 col-sm-12">
        <CInputGroup class="mb-3">
          <CFormInput type="file" multiple @change="(event) => handleFileChange(event)" />
        </CInputGroup>
      </div>
    </div>

    <div class="row mb-3" v-if="files.length">
      <div class="col-12">
        <p>Fotos selecionadas:</p>
      </div>
      <div class="col-12 photos-container">
        <ul style="list-style: none; display: flex; flex-direction: row; flex-wrap: wrap">
          <li
            v-for="(file, index) in files"
            :key="index"
            style="position: relative; margin: 10px"
            class="photo-item"
          >
            <img :src="file.preview" :alt="file.name" class="preview-image" />
            <CButton
              class="delete-button"
              color="danger"
              @click="removeFile(index)"
              title="Remover"
            >
              <CIcon :icon="cilTrash" />
            </CButton>
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-3">
        <CButton color="primary" type="submit" class="me-4">
          {{ vehicle.id ? 'Atualizar' : 'Salvar' }}
        </CButton>
        <CButton v-if="vehicle.id" color="danger" class="me-4" @click="$emit('showDeleteModal')"
          >Deletar</CButton
        >
      </div>
    </div>
  </CForm>
</template>

<style scoped>
.preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  display: block;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.photo-item {
  position: relative;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  padding: 5px;
  font-size: 12px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
}

.photo-item:hover .delete-button {
  display: block;
}
</style>
