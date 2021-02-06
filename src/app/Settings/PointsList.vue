<template>
  <div :class="$style.wrapper">
    <Simplebar>
      <div :class="$style.inner">
        <div v-for="item in list" :class="$style.listItem" :key="item.id">

          <div :class="$style.point">
            <Point overflow-style="break">{{ item.value }}</Point>
          </div>

          <div :class="$style.iconWrapper">
            <Button
              appearance="danger"
              view="squared"
              :class="$style.button"
              ref="button"
              @click="removePoint(item.id)"
            >
              <div :class="$style.icon">
                <Trash/>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Simplebar>
  </div>
</template>

<script>
  import Point from '/@/components/Point.vue';
  import Simplebar from '/@/components/Simplebar.vue';
  import Button from '/@/components/Button.vue';
  import Trash from '/@/components/icons/Trash.vue';

  export default {
    name: 'PointsList',
    components: { Trash, Button, Point, Simplebar },
    props: {
      list: {
        type: Array,
        required: true,
      }
    },
    methods: {
      removePoint(id) {
        this.$emit('remove-point', id);
      },
    },
  };
</script>

<style module lang="scss">
  .wrapper {
    height: 300px;
    overflow: auto;
    border: 2px solid var(--border);
    box-shadow: 0 0 3px rgba(0,0,0,0.5) inset;
  }

  .inner {
    padding: 11px;
  }

  .list-item {
    margin-bottom: 13px;
    display: flex;
    font-size: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .icon-wrapper {
    margin-left: 15px;
  }

  .button {
    width: 3em;
    height: 3em;
  }

  .icon {
    width: 2rem;
    display: flex;
    align-items: center;
  }

  .point {
    width: 100%;
    max-width: calc(100% - 3rem - 15px);
  }
</style>
