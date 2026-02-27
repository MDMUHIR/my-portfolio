<template>
  <section
    id="home"
    style="
      background: linear-gradient(
        135deg,
        #1e1e1e 0%,
        #252526 50%,
        #1e1e1e 100%
      );
    "
    class="py-20 md:py-32"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div>
          <h1
            style="color: #cccccc"
            class="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            $ <span style="color: #007acc">code</span>
            <span style="color: #4ec9b0">Your</span>
            <span style="color: #dcdcaa">Name</span>
          </h1>
          <p style="color: #858585" class="text-xl mb-2 font-semibold">
            > Full Stack Developer & AI Engineer
          </p>
          <p style="color: #cccccc" class="text-base mb-8 leading-relaxed">
            I build scalable web applications, integrate AI/ML technologies, and
            help teams ship production-ready features. Passionate about clean
            code and elegant solutions.
          </p>

          <!-- Stats -->
          <div
            style="border-color: #3e3e42"
            class="grid grid-cols-3 gap-4 mb-8 py-6 border-y"
          >
            <div>
              <div style="color: #007acc" class="text-2xl font-bold">5+</div>
              <div style="color: #858585" class="text-sm">Years Exp</div>
            </div>
            <div>
              <div style="color: #007acc" class="text-2xl font-bold">50+</div>
              <div style="color: #858585" class="text-sm">Projects</div>
            </div>
            <div>
              <div style="color: #4ec9b0" class="text-2xl font-bold">∞</div>
              <div style="color: #858585" class="text-sm">Learning</div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#projects" class="btn-primary text-center">
              ▶ View Projects
            </a>
            <a href="#contact" class="btn-secondary text-center"> → Connect </a>
          </div>

          <!-- Social Links -->
          <div class="flex gap-4 mt-8">
            <a
              href="#"
              aria-label="GitHub"
              style="
                background-color: #2d2d30;
                border: 1px solid #3e3e42;
                color: #858585;
              "
              class="w-10 h-10 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 transition text-lg"
            >
              🐙
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              style="
                background-color: #2d2d30;
                border: 1px solid #3e3e42;
                color: #858585;
              "
              class="w-10 h-10 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 transition text-lg"
            >
              💼
            </a>
            <a
              href="#"
              aria-label="Twitter"
              style="
                background-color: #2d2d30;
                border: 1px solid #3e3e42;
                color: #858585;
              "
              class="w-10 h-10 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 transition text-lg"
            >
              𝕏
            </a>
            <a
              href="#"
              aria-label="Email"
              style="
                background-color: #2d2d30;
                border: 1px solid #3e3e42;
                color: #858585;
              "
              class="w-10 h-10 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 transition text-lg"
            >
              ✉️
            </a>
          </div>
        </div>

        <!-- Right Visual - Code Block Style -->
        <div class="hidden md:flex items-center justify-center">
          <div
            style="
              background-color: #252526;
              border: 1px solid #3e3e42;
              border-radius: 8px;
              padding: 16px;
              font-family: &quot;Consolas&quot;, &quot;Monaco&quot;, monospace;
              font-size: 14px;
              line-height: 1.6;
            "
            class="w-full max-w-sm"
          >
            <div style="color: #858585">
              <div style="color: #888888">1</div>
              <div style="color: #4ec9b0">const</div>
              <span style="color: #cccccc"> developer = {</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <div style="color: #888888">2</div>
              <span style="color: #9cdcfe">name</span>
              <span style="color: #d4d4d4">:</span>
              <span style="color: #ce9178">"Your Name"</span>
              <span style="color: #d4d4d4">,</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <div style="color: #888888">3</div>
              <span style="color: #9cdcfe">skills</span>
              <span style="color: #d4d4d4">: [</span>
              <span style="color: #ce9178">"Vue"</span>
              <span style="color: #d4d4d4">,</span>
              <span style="color: #ce9178">"React"</span>
              <span style="color: #d4d4d4">,</span>
              <span style="color: #ce9178">"Node"</span>
              <span style="color: #d4d4d4">],</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <div style="color: #888888">4</div>
              <span style="color: #9cdcfe">passionate</span>
              <span style="color: #d4d4d4">:</span>
              <span style="color: #569cd6">true</span>
              <span style="color: #d4d4d4">,</span>
            </div>
            <div style="color: #858585">
              <div style="color: #888888">5</div>
              <span style="color: #d4d4d4">};</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="flex justify-center mt-16">
        <a
          href="#about"
          style="color: #858585"
          class="flex flex-col items-center hover:text-blue-400 transition animate-bounce"
        >
          <span class="text-sm font-semibold mb-2">Scroll to explore</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
