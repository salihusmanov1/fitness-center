<template>
  <section class="my-20">
    <div class="w-[70%] mx-auto">
      <div class="flex gap-4">
        <div class="bg-primary w-[400px] min-h-[572px] py-24 flex items-center justify-center">
          <div class="mockup-phone w-auto h-full border-none rounded-[48px]">
            <div class="mockup-phone-camera " />
            <div class="mockup-phone-display rounded-[56px] grid place-content-center text-zinc-600 bg-neutral-900">
              App Image Here
            </div>
          </div>
        </div>
        <div class="flex-1 p-4  flex items-center w-full">
          <div class="space-y-8 w-full">
            <div class="space-y-4">
              <h3 class="text-5xl font-extrabold stretched-text scale-y-105 italic text-base-content">
                Download Our Mobile App
              </h3>
              <p>Download the “” app to easily stay updated on the go.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-[20%_60%_20%] gap-2">
              <div class="flex flex-col items-start gap-2 border-b border-base-content py-1">
                <label for="country_code">Country</label>
                <select
                  id="country_code"
                  class="select select-ghost"
                >
                  <option
                    disabled
                    selected
                  >
                    +998
                  </option>
                  <option>Inter</option>
                  <option>Poppins</option>
                  <option>Raleway</option>
                </select>
              </div>
              <div class="flex flex-col items-start gap-2 border-b border-base-content py-1">
                <label for="phone_number">Phone Number</label>
                <input
                  id="phone_number"
                  placeholder="Add your phone number..."
                  type="text"
                  class="input input-ghost w-full"
                >
              </div>
              <div class="flex items-end justify-start">
                <button class="btn btn-primary stretched-text tracking-tighter text-lg">
                  Send
                </button>
              </div>
            </div>

            <div class="flex gap-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=placeholder"
                alt="QR Code"
              >
              <div class="flex flex-col gap-2">
                <a href="https://apps.apple.com/app/your-app-id">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    style="height:50px; width:170px"
                  >
                </a>

                <a href="https://play.google.com/store/apps/details?id=your.app.id">
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    style="height:50px; width:170px; object-fit: cover"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
