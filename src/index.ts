type InputItemBase<T extends string> = {
  name: string;
  tagName: "input";
  label: string;
  type: T
}

type SelectionInputItem = {
  values: { label: string; value: number }[];
} & InputItemBase<"checkbox" | "radio">

type OtherInputItem = {
  placeholder: string;
} & InputItemBase<"text" | "email" | "tel">

type InputItem = SelectionInputItem | OtherInputItem

type TextAreaInputItem = {
  name: string,
  tagName: "textarea",
  label: string;
  placeholder: string;
}

type SelectItem = {
  name: string;
  tagName: "select";
  label: string;
  options: { text: string; value: number }[];
}

type Item = TextAreaInputItem | SelectItem | InputItem;

const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];

// _____________________________________________________________________________
//

function wrapDoms(label: string, elems: HTMLElement[]): HTMLElement {
  const tr = document.createElement("tr")
  const th = document.createElement("th")
  th.innerText = label
  tr.appendChild(th)
  const td = document.createElement("td")

  for (const elem of elems) {
    td.appendChild(elem)
  }

  tr.appendChild(td)

  return tr
}

function createSelectableInputItem(item: SelectionInputItem) {
  const doms: HTMLElement[] = []
  for (const v of item.values) {
    const id = `${item.name}-${v.value}`
    const input = document.createElement("input")
    input.name = item.name
    input.type = item.type
    input.value = v.value.toString()
    input.id = id
    doms.push(input)

    const label = document.createElement("label")
    label.textContent = v.label
    label.htmlFor = id
    doms.push(label)
  }

  return wrapDoms(item.label, doms)
}

function createSingleInputRow(item: OtherInputItem) {
  const input = document.createElement("input")
  input.name = item.name
  input.type = item.type
  input.placeholder = item.placeholder
  return wrapDoms(item.label, [input])
}

function createInputRow(item: InputItem) {
  switch (item.type) {
    case "checkbox":
    case "radio":
      return createSelectableInputItem(item)
    default:
      return createSingleInputRow(item)
  }
}

function createSelectRow(item: SelectItem) {
  const select = document.createElement("select")

  for (const i of item.options) {
    const opt = document.createElement("option")
    opt.text = i.text
    opt.value = i.value.toString()
    select.options.add(opt)
  }

  return wrapDoms(item.label, [select])
}

function createTextAreaRow(item: TextAreaInputItem) {
  const textarea = document.createElement("textarea")
  textarea.name = item.name
  textarea.placeholder = item.placeholder
  return wrapDoms(item.label, [textarea])
}

function createTable() {
  const table = document.createElement("table")

  for (const item of items) {
    let dom: HTMLElement
    switch (item.tagName) {
      case "input":
        dom = createInputRow(item);
        break
      case "select":
        dom = createSelectRow(item);
        break
      case "textarea":
        dom = createTextAreaRow(item);
        break
    }
    table.appendChild(dom)
  }

  return table
}

function createFormDom() {
  const form = document.getElementById("form") as HTMLDivElement;
  form.appendChild(createTable());
}

createFormDom();
