// util
type Implements<T, U extends T> = {};

// types
interface ItemInterface {
  name: string;
  label: string;
  tagName: string;
}
interface SingleValueInputItem<TYPE extends string>
  extends Implements<ItemInterface, SingleValueInputItem<string>> {
  name: string;
  label: string;
  tagName: "input";
  type: TYPE;
  placeholder: string;
}
interface MultipleValueInputItem<TYPE extends string>
  extends Implements<ItemInterface, MultipleValueInputItem<string>> {
  name: string;
  label: string;
  tagName: "input";
  type: TYPE;
  values: { label: string; value: number }[];
}
interface SelectItem extends Implements<ItemInterface, SelectItem> {
  name: string;
  label: string;
  tagName: "select";
  options: { text: string; value: number }[];
}
interface TextareaItem extends Implements<ItemInterface, TextareaItem> {
  name: string;
  label: string;
  tagName: "textarea";
  placeholder: string;
}
type SingleValueInputItems =
  | SingleValueInputItem<"text">
  | SingleValueInputItem<"email">
  | SingleValueInputItem<"tel">;
type MultipleValueInputItems =
  | MultipleValueInputItem<"radio">
  | MultipleValueInputItem<"checkbox">;
type Item =
  | SingleValueInputItems
  | MultipleValueInputItems
  | SelectItem
  | TextareaItem;

// form data
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
function createInputRow(
  item: SingleValueInputItems | MultipleValueInputItems
): string {
  switch (item.type) {
    case "text":
    case "email":
    case "tel":
      return `
        <tr>
          <th>${item.label}</th>
          <td>
            <input type="${item.type}" placeholder="${item.placeholder}" />
          </td>
        </tr>`;
    case "radio":
    case "checkbox":
      const inputs_html = item.values
        .map(
          (x) => `
          <input type="${item.type}" id="${x.label}" name="${item.name}" value="${x.value}">
          <label for="${x.label}">${x.label}</label>`
        )
        .join("");

      return `
        <tr>
          <th>${item.label}</th>
          <td>${inputs_html}</td>
        </tr>`;
    default:
      const never_item: never = item;
      throw new Error(`unexpected case: ${never_item}`);
  }
}

function createSelectRow(item: SelectItem): string {
  const options_html = item.options
    .map((x) => `<option value="${x.value}">${x.text}</option>`)
    .join("");

  return `
    <tr>
      <th>${item.label}</th>
      <td>
        <select>
          ${options_html}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextareaItem): string {
  return `
    <tr>
      <th>${item.label}</th>
      <td>
        <textarea id="${item.name}" name="${item.name}" placeholder="${item.placeholder}></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          return createInputRow(item);
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
        default:
          const never_item: never = item;
          throw new Error(`unexpected case: ${never_item}`);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (form === null) return;

  form.innerHTML = createTable();
}

createFormDom();
