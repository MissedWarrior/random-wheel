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

<script>
  import { getStorageItem, setStorageItem } from '/@/utils/storage';
  import { parseSavedData } from '/@/utils/data-workflow';

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
      importData(file) {
        console.log('import', file);
      },
      exportData() {
        console.log('export');
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
