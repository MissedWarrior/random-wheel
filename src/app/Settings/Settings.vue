<template>
  <div :class="$style.addPoint">
    <AddPoint @add-point="addPoint"/>
  </div>
  <div :class="$style.searchPoints">
    <SearchPoints/>
  </div>
  <div :class="$style.pointsList">
    <PointsList :list="wheelStore.state.value.variants" @remove-point="removePoint"/>
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

  import AddPoint from './AddPoint.vue';
  import BackgroundImage from './BackgroundImage.vue';
  import DataTransfer from './DataTransfer.vue';
  import PointsList from './PointsList.vue';
  import SearchPoints from './SearchPoints.vue';

  export default {
    name: 'Settings',
    components: { AddPoint, BackgroundImage, DataTransfer, PointsList, SearchPoints },
    inject: ['wheelStore'],
    methods: {
      addPoint(newPoint) {
        this.wheelStore.addVariant(newPoint);
      },
      removePoint(index) {
        this.wheelStore.removeVariant(index);
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

          if (confirm('Внимание! В результате импорта ВСЕ текущие данные будут перезаписаны. Вы согласны?')) {
            this.wheelStore.setNewVariants(result.data);
            alert('Данные успешно импортированы!');
          }
        };

        fileReader.onerror = () => {
          alert(`Не удалось считать файл по следующей причине: ${ fileReader.error }`);
        };
      },
      exportData() {
        const currentItems = this.wheelStore.state.value.variants;

        const config = createConfig(currentItems);
        const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
        const link = document.createElement('a');

        link.download = 'config-schema.json';
        link.href = URL.createObjectURL(blob);

        link.click();
      },
    }
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
