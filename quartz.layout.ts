import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // 首页专用的最近更新列表（自动出现在正文下方）
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.RecentNotes({
        title: "📂 最近发布的 Excel 教程",
        limit: 5,
        showTags: false, // 关闭标签显示，让界面更清爽
        linkToMore: "tags/",
        filter: (f) => f.slug !== "index",
      }),
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Echo471/excel_site",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    // 【核心优化：侧边栏瘦身】
    Component.Explorer({
      title: "知识目录",
      useSavedState: true,
      mapFn: (node) => {
        // 1. 移除开头的 "Excel " 或 "Excel_" 或 "Excel-" (不区分大小写)
        node.displayName = node.displayName.replace(/^Excel[ _-]/i, "")
        // 2. 将所有下划线替换为空格
        node.displayName = node.displayName.replace(/_/g, " ")
        // 3. 移除多余的描述性后缀（可选）
        node.displayName = node.displayName.replace(/实战战库|财务人的安全救赎/g, "")
        // 4. 首字母大写（美化）
        node.displayName = node.displayName.trim()
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    // 【核心优化：右侧边栏精简】
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "⚡ 最近更新",
        limit: 5,
        showTags: false, // 隐藏标签
        linkToMore: "tags/",
        filter: (f) => f.slug !== "index",
      }),
    ),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "知识目录",
      mapFn: (node) => {
        node.displayName = node.displayName.replace(/^Excel[ _-]/i, "").replace(/_/g, " ")
      },
    }),
  ],
  right: [],
}
