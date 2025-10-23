<template>
  <div
    ref="panorama"
    style="width: 100%; height: 340px;"
  />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const panorama = ref(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
  script.onload = () => {
    pannellum.viewer(panorama.value, {
      type: "equirectangular",
      panorama: props.src,
      autoLoad: true,
      hotSpots: [
        {
          pitch: -9.4,
          yaw: 1.5,
          type: "info",
          text: "Machine 1",
        },
        {
          pitch: -9.4,
          yaw: 222.6,
          type: "info",
          text: "Machine 2",
        },
        {
          pitch: -9.4,
          yaw: 242.6,
          type: "info",
          text: "Machine 3",
        },
        {
          pitch: -9.4,
          yaw: 422.6,
          type: "info",
          text: "Machine 4",
        },
        {
          pitch: -9.4,
          yaw: 522.6,
          type: "info",
          text: "Machine 5",
        },
        {
          pitch: -9.4,
          yaw: 622.6,
          type: "info",
          text: "Machine 6",
        },
        {
          pitch: -9.4,
          yaw: 722.6,
          type: "info",
          text: "Machine 7",
        },
      ],
    });
  };
  document.head.appendChild(script);
});
</script>

<style lang="scss" scoped></style>
