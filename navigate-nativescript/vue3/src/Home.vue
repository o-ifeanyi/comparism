<script lang="ts" setup>
import { ref, $navigateTo } from "nativescript-vue";
import Details from "./Details.vue";
import { enableLargeTitle } from './util';

const colors = ref(["red", "green", "blue", "orange", "purple", "black"].concat([...Array(5)].map(() => 'transparent')));
function nav() {
  $navigateTo(Details);
}
</script>

<template>
  <Frame>
    <Page @loaded="enableLargeTitle">
      <ActionBar title="Colors" />
      <CollectionView :items="colors" @itemTap="nav" colWidth="49.9%" rowHeight="148" class="px-1" iosOverflowSafeArea="true" scrollBarIndicatorVisible="false">
        <template #default="{ item }">
          <StackLayout class="pt-2">
            <GridLayout
              class="rounded-2xl h-[140] mx-[4]"
              :backgroundColor="item"
            >
            </GridLayout>
          </StackLayout>
        </template>
      </CollectionView>
    </Page>
  </Frame>
</template>
