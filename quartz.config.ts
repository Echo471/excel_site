import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Excel 从入门到精通",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN", // 已改为中文
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lexend",      // 现代感标题字体
        body: "Inter",        // 极简易读正文字体
        code: "Fira Code",    // 优质代码字体
      },
      colors: {
        lightMode: {
          light: "#fafafa",         // 极简底色
          lightgray: "#edeff0",     // 边框色
          gray: "#a0a0a0",          // 辅助字色
          darkgray: "#404040",      // 正文字色
          dark: "#1a1a1a",          // 标题字色
          secondary: "#0e733b",     // Excel 品牌深绿（链接色）
          tertiary: "#21a366",      // 悬停绿
          highlight: "rgba(14, 115, 59, 0.08)", // 选中高亮
          textHighlight: "#fff3cd",
        },
        darkMode: {
          light: "#121212",         // 深色底色
          lightgray: "#2a2a2a",     // 边框色
          gray: "#7a7a7a",          // 辅助字色
          darkgray: "#d4d4d4",      // 正文字色
          dark: "#ffffff",          // 标题字色
          secondary: "#43a047",     // 亮绿（深色模式链接）
          tertiary: "#66bb6a",      // 悬停绿
          highlight: "rgba(67, 160, 71, 0.15)",
          textHighlight: "#3d3d00",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config