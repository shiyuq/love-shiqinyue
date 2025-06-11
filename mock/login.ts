// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      const adminUser = {
        施雨强: "shiyuqiang",
        崔明慧: "cuiminghui",
        何利民: "heliming",
        施华: "shihua",
        赵雅思: "zhaoyasi",
        崔玉龙: "cuiyulong"
      };
      if (Object.keys(adminUser).includes(body.username)) {
        if (adminUser[body.username] !== body.password) {
          return { success: false, data: {} };
        }
        return {
          success: true,
          data: {
            avatar: "https://avatars.githubusercontent.com/u/52823142",
            username: body.username,
            nickname: body.username,
            // 一个用户可能有多个角色
            roles: ["admin"],
            // 按钮级别权限
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2100/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: false,
          data: {}
          // data: {
          //   avatar: "https://avatars.githubusercontent.com/u/52823142",
          //   username: "common",
          //   nickname: "小林",
          //   roles: ["common"],
          //   permissions: ["permission:btn:add", "permission:btn:edit"],
          //   accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
          //   refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
          //   expires: "2030/10/30 00:00:00"
          // }
        };
      }
    }
  }
]);
