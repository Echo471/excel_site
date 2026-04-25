import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // 【新增】自动在首页正文下方显示最近更新列表，无需手动编辑 index.md
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.RecentNotes({
        title: "📢 最近发布的 Excel 教程",
        limit: 5,
        showTags: true,
        linkToMore: "tags/", // 点击标题可以跳转到标签页查看更多
        filter: (f) => f.slug !== "index", // 过滤掉首页自己
      }),
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Echo471/excel_site",
      "Excel 实战手册": "https://excel-site-eta.vercel.app",
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
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    // 【新增】在右侧边栏也显示最近更新，方便快速跳转
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "近期更新",
        limit: 3,
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
    Component.Explorer(),
  ],
  right: [],
}
