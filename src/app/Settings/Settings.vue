<template>
  <div :class="$style.addPoint">
    <AddPoint @add-point="addPoint"/>
  </div>
  <div :class="$style.searchPoints">
    <SearchPoints/>
  </div>
  <div :class="$style.pointsList">
    <PointsList/>
  </div>
  <div :class="$style.dataTransfer">
    <DataTransfer @import-data="importData" @export-data="exportData"/>
  </div>
  <div :class="$style.backgroundImage">
    <BackgroundImage/>
  </div>
</template>

<script lang="ts">
  import { getStorageItem, setStorageItem } from '/@/utils/storage';
  import { parseSavedData, createConfig, validateConfig } from '/@/utils/data-workflow';

  import AddPoint from './AddPoint.vue';
  import BackgroundImage from './BackgroundImage.vue';
  import DataTransfer from './DataTransfer.vue';
  import PointsList from './PointsList.vue';
  import SearchPoints from './SearchPoints.vue';

  export default {
    name: 'Settings',
    components: { AddPoint, BackgroundImage, DataTransfer, PointsList, SearchPoints },
    inject: ['configKey'],
    methods: {
      addPoint(newPoint) {
        const key = this.configKey;
        const currentItems = parseSavedData(getStorageItem(key), key);

        const newItem = {
          value: newPoint,
        };

        currentItems.unshift(newItem);

        setStorageItem(key, JSON.stringify(currentItems));
      },
      importData(e) {
        const { files } = e.target;
        const configFile = files[0];

        if (configFile.type !== 'application/json') {
          return alert('Импортируемый файл должен быть с расширением .json');
        }

        const fileReader = new FileReader();

        fileReader.readAsText(configFile);

        fileReader.onload = () => {

          let result: object;

          try {
            result = JSON.parse(fileReader.result as string);
          } catch (e) {
            return alert('Не удалось импортировать схему: данные повреждены.');
          }

          const validationData = validateConfig(result);

          if (!validationData.isValid) {
            alert(validationData.reason);
          }

          if (confirm('Внимание! В результате импорта ВСЕ текущие данные будут перезаписаны. Вы согласны?')) {
            setStorageItem(this.configKey, JSON.stringify(result.data));
            alert('Данные успешно импортированы!');
          }
        };

        fileReader.onerror = () => {
          alert(`Не удалось считать файл по следующей причине: ${ fileReader.error }`);
        };
      },
      exportData() {
        const key = this.configKey;
        const currentItems = parseSavedData(getStorageItem(key), key);

        const config = createConfig(currentItems);
        const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
        const link = document.createElement('a');

        link.download = 'config-schema.json';
        link.href = URL.createObjectURL(blob);

        link.click();
      }
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