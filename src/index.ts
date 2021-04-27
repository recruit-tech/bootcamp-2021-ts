type TextItem = {
  name: string;
  tagName: "input";
  type: "text" | "email" | "tel";
  label: string;
  placeholder: string;
}

type RadioOrCheckboxItem = {
  name: string;
  label: string;
  tagName: "input";
  type: "radio" | "checkbox";
  values: { label: string; value: number }[];
}

type SelectItem = {
  name: string;
  label: string;
  tagName: "select";
  options: { text: string, value: number }[];
}

type TextAreaItem = {
  name: string;
  label: string;
  tagName: "textarea";
  placeholder: string;
}

type Item =
  TextItem |
  RadioOrCheckboxItem |
  SelectItem |
  TextAreaItem;

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

function createTextInput(type: string, placeholder: string) {
  switch (type) {
    case "text": case "email": case "tel":
      return `
        <input type=${type}" placeholder=${placeholder} >
      `
    default:
      return "";
  }
}

function createRadioOrCheckbox(type: string, values: {label: string, value: number}[]) {
  let str = "";
  values.forEach(value => {
    str += `
        <input type="${type}" value=${value.value} >${value.label}
      `
  });
  return str;
}

function createInputRow(item: TextItem | RadioOrCheckboxItem) {
  let row = ""
  switch (item.type) {
    case "text": case "email": case "tel":
      row += createTextInput(item.type, item.placeholder)
      break;
    case "radio": case "checkbox":
      row += createRadioOrCheckbox(item.type, item.values)
      break;
  }
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${row}
      </td>
    </tr>
  `;
}

function createSelectOptions(options: {text: string, value: number}[]) {
  let str = "";
  options.forEach(option => {
    str += `
    <option value="${option.value}">${option.text}</option>
  `
  });
  return str;
}

function createSelectRow(item: SelectItem) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <select>
          ${createSelectOptions(item.options)}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextAreaItem) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <textarea placeholder=${item.placeholder}></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          return createInputRow(item)
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (form !== null) {
    form.innerHTML = createTable();
  }
}

createFormDom();
