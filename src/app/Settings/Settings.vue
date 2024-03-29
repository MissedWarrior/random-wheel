<template>
  <div :class="$style.addPoint">
    <AddPoint @add-point="addPoint"/>
  </div>
  <div :class="$style.searchPoints">
    <SearchPoints v-model:query="searchValue"/>
  </div>
  <div :class="$style.pointsList">
    <PointsList
      :list="resultList"
      @remove-point="removePoint"
    />
  </div>
  <div :class="$style.dataTransfer">
    <DataTransfer @import-data="importData" @export-data="exportData"/>
  </div>
  <div :class="$style.backgroundImage">
    <BackgroundImage/>
  </div>
</template>

<script>
  import { createConfig, validateConfig } from '/@/utils/data-workflow';
  import { downloadFile } from '/@/utils/download-file';

  import AddPoint from './AddPoint.vue';
  import BackgroundImage from './BackgroundImage.vue';
  import DataTransfer from './DataTransfer.vue';
  import PointsList from './PointsList.vue';
  import SearchPoints from './SearchPoints.vue';

  export default {
    name: 'Settings',
    components: { AddPoint, BackgroundImage, DataTransfer, PointsList, SearchPoints },
    inject: ['wheelStore'],
    data() {
      return {
        searchValue: '',
      };
    },
    computed: {
      resultList() {
        const list = this.wheelStore.getActiveList();

        if (this.searchValue.length > 0) {
          return list.filter(item => {
            return item.value.toLowerCase().includes(this.searchValue.toLowerCase());
          });
        }

        return list;
      },
    },
    methods: {
      addPoint(newPoint) {
        this.wheelStore.addVariant(newPoint);
      },
      removePoint(id) {
        this.wheelStore.removeVariant(id);
      },
      importData(e) {
        const { files } = e.target;
        const configFile = files[0];

        if (!configFile) return;

        if (configFile.type !== 'application/json') {
          return alert('Импортируемый файл должен быть с расширением .json');
        }

        const fileReader = new FileReader();

        fileReader.readAsText(configFile);

        fileReader.onload = () => {
          let result;

          try {
            result = JSON.parse(fileReader.result);
          } catch (e) {
            return alert('Не удалось импортировать схему: данные повреждены.');
          }

          const validationData = validateConfig(result);

          if (!validationData.isValid) {
            alert(validationData.reason);
          }

          const rewriteWarning = 'Внимание! В результате импорта ВСЕ текущие данные будут' +
            ' перезаписаны. Вы согласны?';
          if (confirm(rewriteWarning)) {
            this.wheelStore.setNewVariants(result.data);
            alert('Данные успешно импортированы!');
          }
        };

        fileReader.onerror = () => {
          alert(`Не удалось считать файл по следующей причине: ${ fileReader.error }`);
        };
      },
      exportData() {
        const currentItems = this.wheelStore.getActiveList();

        const config = createConfig(currentItems);
        const blob = new Blob([JSON.stringify(config)], {
          type: 'application/json',
        });

        downloadFile({
          fileName: 'config-schema.json',
          blob,
        });
      },
    },
  };
</script>

<style module lang="scss">
  .add-point {
    margin-bottom: 20px;
  }

  .search-points {
    margin-bottom: 10px;
  }

  .points-list {
    margin-bottom: 20px;
  }

  .data-transfer {
    margin-bottom: 20px;
  }

  .background-image {

  }
</style>
