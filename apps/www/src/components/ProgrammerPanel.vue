<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { markit } from '@navifox/utils';

const programmerLevels = [
    {
        level: '6 级：质量监督员',
        points: [
            { text: '你会根据项目需求接触并深入研究各个领域的技术。' },
            { text: '你已经掌握了多个横向领域的技术，能够超越技术栈给出适合项目的__技术方案__。', unlit: true },
            { text: '你对__软件质量__有深刻的理解，注重产品的稳定性、安全性和可维护性。' },
            { text: '你能够使用各种工具进行__静态分析__、__动态分析__和__代码审查__，以提高代码的质量和安全性。' },
            { text: '你总是能在代码评审中发现别人意识不到的细节问题。' },
            { text: '你会为项目制定合理的__量化指标__，并使用技术手段持续跟进防止劣化。', unlit: true },
            { text: '你可以为项目沉淀技术规范，制定最佳编码实践，提升项目整体的代码质量和编码效率。' },
            { text: '你在团队中发挥着__技术引导__作用，推动团队不断提升软件开发的质量和稳定性。' },
            { text: '你也会利用闲暇时间开发一些__开源__项目，或者有能力为一些著名的开源项目贡献代码。' },
            {
                text: '你也开始在一些场合__分享__自己的技术实践，尽管有时候你还不太习惯在很多人面前大声表达自己的意见。',
            },
            { text: '对了，你可能掌握了多门编程语言，也有编程语言偏好，但对于吹捧特定语言的行为持保留意见。' },
        ],
    },
    {
        level: '5 级：性能观察员',
        points: [
            { text: '你已经可以灵活自如地运用你常用的编程语言的各种特性。' },
            { text: '如果你最常用的语言是 C++，你应该能够对编译器常见的性能优化如数家珍。' },
            { text: '如果你最常用的语言不是 C++，你应该对 C/C++ 有一定的认识和了解，可以读懂常见的 C/C++ 代码。' },
            { text: '你编写代码时开始小心翼翼，不仅关注程序__正确性__，还会关注程序的__性能__。' },
            { text: '你很清楚数据结构和算法对性能的影响，会选择合适的__算法__来提升程序的性能。' },
            { text: '你对常见的__性能问题__有较深的理解，如内存泄漏、GC 垃圾回收、CPU 使用率等。' },
            { text: '你可以熟练运用常见的性能工具分析程序的__性能__瓶颈，并给出__优化__方案。' },
            { text: '你理解系统的各个组成部分，能够在实现新功能时考虑到系统整体的__架构__和__稳定性__。' },
            { text: '你开始看到散落的知识点之间产生美妙的连接，__知识体系__逐渐构建起来。' },
            { text: '不过，你也更加清楚的认识到自己存在哪些不足，并开始尝试努力补齐自己的短板。' },
        ],
    },
    {
        level: '4 级：问题研究员',
        points: [
            { text: '你已经可以熟练运用你常用的编程语言和编码工具。' },
            { text: '你开始有意识地通过优化工具和编写脚本来提升自己的工作效率。' },
            { text: '你已经开始注意__代码规范__和__代码质量__，并有意识地为程序增加更多的__可扩展性__。' },
            { text: '你开始不满足于表面的现象，并尝试深挖问题的本质。' },
            { text: '你开始意识到__基础知识__对探索问题的本源所带来影响。' },
            { text: '你开始撰写技术文档，总结解决问题的思路和方法。' },
            { text: '你在团队中能够独立承担功能模块的开发任务，偶尔能为同事提供技术支持。' },
            { text: '你开始参与团队内的技术决策，能够提供建设性的意见，推动技术方案的改进。' },
            { text: '你可能还没意识到，你已经是一个有追求的程序员了，言谈举止都透露着优秀程序员的气质。' },
        ],
    },
    {
        level: '3 级：接口装配工',
        points: [
            { text: '你已经能独立开发并实现较为复杂的系统功能，能够自己构思代码实现。' },
            { text: '你已经熟练掌握 __git workflow__，并且在团队里积极推广。' },
            { text: '你能够在已有的系统中添加新功能或调整旧功能，熟悉接口和模块的设计与调用。' },
            { text: '你开始理解并运用__设计模式__，单例模式有几种写法是你最喜欢讨论的话题之一。' },
            { text: '你了解并使用过一些常见的开发框架和库，能够提高自己的__开发效率__。' },
            { text: '你能理解并运用一些基本的__软件设计原则__，但大多数时候依然是依赖别人提供设计。' },
            { text: '你能够按照需求完成较为__规范的代码__，但可能在代码质量、可维护性上有所欠缺。' },
            { text: '你对编程语言的语法了解不深，以至于编码时总是出现技术性 bug。' },
            { text: '你对不同编程语言之间的差异了解不多，也没有深入了解过计算机的底层知识。' },
            { text: '遇到问题你总是能通过__搜索__引擎或者 StackOverflow 找到答案。' },
            { text: '你开始意识到__数据结构和算法__有用，但仍然对于面试中如此重视算法而感到不能接受。' },
            { text: '对你而言，AI 依然是很好的帮手，但你也经常抱怨 AI 有时候不怎么靠谱。' },
            { text: '你对自己的技术能力充满信心，也经常在技术交流群里侃侃而谈。' },
        ],
    },
];
for (const level of programmerLevels) {
    for (const point of level.points) {
        point.text = markit(point.text);
    }
}
</script>

<template>
    <div class="flex flex-col gap-6">
        <section v-for="desc in programmerLevels">
            <div>
                <b>{{ desc.level }}</b>
            </div>
            <ul class="**:transition-all **:duration-200 max-md:leading-relaxed">
                <li
                    v-for="point in desc.points"
                    :class="point.unlit ? '' : 'text-slate-400 dark:text-slate-600'"
                    class="group cursor-default hover:text-slate-900 dark:hover:text-slate-100"
                >
                    <icon :icon="point.unlit ? 'icons8:circle' : 'icons8:checked'" class="mr-1" height="20" />
                    <span
                        class="group-hover:*:[u]:decoration-starlight-500! dark:group-hover:*:[u]:decoration-starlight-400! *:[u]:decoration-transparent! *:[u]:underline-offset-5!"
                        v-html="point.text"
                    />
                </li>
            </ul>
        </section>
    </div>
</template>
