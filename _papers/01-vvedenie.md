---
layout: default
lang: ru
categories: [ru, paper]
ref: '01'
title: Введение
excerpt: >-
    imaZZine!Graph; критический.
---

###### Об `imaZZine!Graph`

Архитектура информационно-вычислительной системы - понятие чрезвычайно абстрактное. Несмотря на очевидную, казалось бы, важность для разрабатываемой системы принимаемых нами архитектурных решений, не существует ни формального списка таких решений, ни даже общепринятого определения для самого термина архитектура.

В основе этого странного противоречия, между всеобщим пониманием важности архитектуры, наряду с полным отсутствием общепринятых стандартов предъявляемых к ней, лежит, я полагаю, довольно специфическое отношение к архитектуре информационно-вычислительных систем в среде профессионального сообщества:

> Архитектура информационно-вычислительной системы представляется в профессиональной среде объектом научного исследования, а не инженерного проектирования.

Это, казалось бы философское, по своей сути, утверждение вносит чудовищную неопределенность в индустрию разработки программного обеспечения, отрицательный эффект от которой трудно переоценить.

Взглянем, сперва, на отсутствие единой терминологической базы. Оно, очевидно, является следствием отсутствия единого понятийного аппарата в изучаемой области. Иными словами, каждый из нас волен понимать под архитектурой системы нечто совершенно свое. И тот факт, что все мы понимаем важность архитектуры, вовсе не дает нам ответ на вопрос: что это такое?

Сюда же можно добавить и отсутствие простых и понятных средств описания архитектуры. Большинство методик столь гибки и абстрактны, что могут быть использованы для описания практически любой системы, при этом, редко определяя формальный перечень документов необходимых для описания ее структуры, границ, связей и поведения.

Подобная ситуация является вполне допустимой с научно-исследовательской точки зрения: мы можем использовать определенный набор UML диаграмм, например, для детального описания системы. Однако, список необходимых диаграмм, уровни детализации и математическая целостность разработанного решения являются частью того же научного процесса.

> И, совершенно очевидно, что в такой ситуации сформировать четкую бизнес цель в отношении архитектуры информационно-вычислительной системы крайне затруднительно.

С другой стороны, использование научного подхода предполагает, отсутствие жестких временных ограничений на исследовательский процесс. Вы не можете составить план по открытию новых частиц в ускорителе или по обнаружению межзвездных объектов в Солнечной системе. Невозможно предсказать время необходимое для решения сложной математической задачи или разработки оптимального алгоритма. Иногда для этого необходимы месяцы, в других случаях - столетия. Порой, решение может отсутствовать вовсе.

Из этого можно сделать неутешительный вывод:

> Процесс разработки архитектурной модели информационно-вычислительной системы является слабо прогнозируемым в рамках бизнес планирования процессом.

---

И это обстоятельство, зачастую, выводит архитектурные аргументы за рамки бизнес значимых.

В результате, мы имеем индустрию, в которой технические решения часто базируются на ожиданиях от кратксрочного экономического эффекта от внедренной функции, а не на фундаментальных особенностях системы которые необхоимо учесть при ее внедрении. Это, очевидно, отрицательным образом сказывается на качестве и надежности всей системы.

---

Данное обстоятельство сильно размывает зону ответственности и круг полномочий архитектора системы, а также, в значительной мере, затрудняет диалог между архитектором и другими участниками команды. Ведь отсутствие формальной договоренности о том, что именно являет собой архитектура, делает практически невозможной выработку каких бы то ни было архитектурных KPIs.

Отсутствие же качественных и количественных показателей, при обсуждении технических решений с бизнес ориентированной частью команды, приводит к снижению влияния роли архитектора в проекте до церемониальной, консультативной и исследовательской.

В результате, большинство проектных решений основываются скорее на краткосрочных экономических ожиданиях от внедрения, чем на анализе фундаментальных архитектурных особенностей, потребностей и ограничений, что в конце концов, непременно отражается уже на качестве самой системы (Is High Quality Software Worth the Cost?).

Это очевидное, казалось бы, противоречие между всеобщим пониманием важности построения правильной архитектуры системы, с одной стороны, и диктатом краткосрочных экономических выгод при принятии решений, с другой, имеет под собой, полагаю, как исторические, так и экономические и технические предпосылки.
