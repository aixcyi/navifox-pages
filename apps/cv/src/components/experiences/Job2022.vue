<script lang="ts" setup>
import Experience from '#/components/Experience.vue';
import { ColorBadge } from '@navifox/constants';
import type { Project } from '@navifox/types';

const project: Project = {
    name: '景区生态系统',
    description: '',
    stack: [
        ColorBadge.Python,
        ColorBadge.Django,
        ColorBadge.DjangoRESTFramework,
        ColorBadge.Vue,
        ColorBadge.JavaScript,
        ColorBadge.PostgreSQL,
        ColorBadge.Redis,
        ColorBadge.Apifox,
        ColorBadge.Grafana,
    ]
}
</script>


<template>
<Experience :project start="2022.3" team="广州某某科技" title="后端开发">
    <p>
        <span>公司深耕旅游行业，摸索自研了一整套 SaaS 景区生态系统，而我主要参与了其中几个子服务的建设和维护。</span>
        <span>目前所有服务均面向三个层面开发：景区、自营商户/入驻商户、员工/顾客。</span>
    </p>
    <p>
        <span><b>餐饮零售</b>，包含收银软硬件，面向餐饮与零售两大业务场景做通用化设计，<code>2023.6</code> 立项至今仍在迭代。</span>
        <span>立项阶段主要负责 WMS 部分的 ORM 模型设计，包括商品、SKU、规格、小料、分类、标签、计量单位、品牌、供应商、购物车等，</span>
        <span>后续转由个人独立负责，又设计了预设套餐、现选套餐、会员等。</span>
    </p>
    <!-- TODO: 待完善 -->
    <p>
        <span><b>线上电商</b>，包含商家端 Web 后台、客户端小程序、员工端公众号三个场景。</span>
        <span>后台主要有用户、帐套（角色）、商品、两套分类、促销活动、景区内外地址、订单、退款等管理；</span>
        <span>员工通过公众号绑定接收线上下单通知，点击跳转到免登录 H5 页面浏览来执行备货、打包、发货等操作；</span>
        <span>小程序包含简单的商品、订单、退款、地址等管理，可浏览实时或定时开启的促销活动。</span>
    </p>
    <p>
        <span>自入职开始接手至 <code>2022.12</code> 开始推动执行<u>仓库拆分</u>与<u>服务解耦</u>，</span>
        <span>期间经历了从 MySQL 5 到 <u>PostgreSQL</u> 的迁移，后维护至 <code>2025.3</code> 因业务调整而停止。</span>
        <span>为了不破坏终端用户的操作惯性，我决定仅拆分后端，前端通过另行封装改变 API 调用。</span>
        <span>我将小程序的平台认证过程留在“主平台”，本地将前端传入的 Session-ID 转发给“主平台”代为认证后拿到
            <code>openid</code> 及用户基础信息，然后将 JSON 递归转化为 Python 对象，并添加
            <code>is_authenticated</code>、<code>is_active</code>、<code>is_staff</code>
            等属性来适配 Django 的<u>认证器</u>和<u>鉴权器</u>。</span>
    </p>
    <p>
        <span>比较惋惜的是：对于内外部的 HTTP 请求响应没有做到足够的封装，以至于不得不在各处捕获异常；</span>
        <span>而小程序的认证响应更是直接将“主平台”序列化得到的 <code>dict</code> 递归转换为（子服务中的）<code>object</code>
            留存在缓存中，仅存储了“主平台”侧的 <code>biz_id</code> 与便于执行认证的
            Session-ID，导致子服务缺少类型提示和快速关联查找能力。</span>
    </p>
</Experience>
</template>
