<template>
  <div :class="$style.footer">
    <div :class="$style.inner">
      <div :class="$style.linkWrapper">
        <div :class="$style.mr">Made by</div>

        <Link is-external-link href="https://github.com/missedwarrior" :class="$style.link">
          <div :class="$style.icon">
            <img src="https://avatars.githubusercontent.com/u/8355785" alt="MissedWarrior">
          </div>
          <div :class="$style.ml">@MissedWarrior</div>
        </Link>

      </div>
    </div>
  </div>
</template>

<script>
  import Link from '/@/components/Link.vue';

  export default {
    name: 'Footer',
    components: { Link },
  };
</script>

<style module lang="scss">
  .footer {
    padding: 12px 24px;
    border-top: 1px solid var(--border);
    width: 100%;
  }

  .inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .icon {
    width: 28px;
    height: 28px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    & > img {
      height: 100%;
      object-fit: contain;
    }
  }

  .link-wrapper {
    display: flex;
    align-items: center;
  }

  .mr {
    margin-right: 4px;
    display: inline-block;
  }

  .ml {
    margin-left: 4px;
    display: inline-block;
  }

  .link {
    display: flex;
    align-items: center;
  }
</style>
