<template>
  <div>
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-center px-4">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        VIDEO COURSES
      </h1>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        I'm a paragraph. Click here to add your own text and edit me. <br>
        Let your users get to know you.
      </p>
    </section>
    <VideoCoursesCourse
      v-for="(course, index) in courses"
      :key="index"
      :course="course"
    />
  </div>
</template>

<script setup>
const courses = [
  {
    img: "/video-courses-1.jpg",
    header: "Beginners Class 02",
    text: "Subscribe $9.99/mo.",
    children: [
      {
        title: "Video 1",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-1.jpg",
        header: "Beginners Class 01 / 00:32",
        text: "Rent $2.99",
      },
      {
        title: "Video 2",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-2.jpg",
        header: "Beginners Class 02 / 00:29",
        text: "Rent $2.99",
      },
      {
        title: "Video 3",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-3.jpg",
        header: "Beginners Class 03 / 00:29",
        text: "Rent $2.99",
      },
    ],
  },

  {
    img: "/video-courses-2.jpg",
    header: "ADVANCED COURSE",
    text: "Subscribe $10.99/mo.",
    children: [
      {
        title: "Video 1",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-1.jpg",
        header: "The Challenge - Week 1 / 00:32",
        text: "Rent $2.99",
      },
      {
        title: "Video 2",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-2.jpg",
        header: "The Challenge - Week 2 / 00:29",
        text: "Rent $2.99",
      },
      {
        title: "Video 3",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-1.jpg",
        header: "The Challenge - Week 3 / 00:29",
        text: "Rent $2.99",
      },
    ],
  },
  {
    img: "/video-courses-3.jpg",
    header: "The 3 MONTH CHALLENGE",
    text: "Subscribe $12.99/mo.",
    children: [
      {
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-1.jpg",
        header: "The Challenge - Week 1 / 00:32",
        text: "Rent $2.99",
      },
      {
        header: "The Challenge - Week 2 / 00:29",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-2.jpg",
        text: "Rent $2.99",
      },
      {
        header: "The Challenge - Week 3 / 00:29",
        text: "Rent $2.99",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/video-courses-3.jpg",
      },
    ],
  },
];
</script>
