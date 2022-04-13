type Item = InputTag | SelectTag | TextareaTag;
type Option = {
  text: string,
  value: number
};

type InputTag = TextInput | Radio | Checkbox;

type TextInput = {
  name: string;
  label: string;
  tagName: "input";
  type: "text" | "email" | "tel";
  placeholder?: string;
}

type Radio = {
  name: string;
  label: string;
  tagName: "input";
  type: "radio";
  values: { label: string; value: number }[];
};

type Checkbox = {
  name: string;
  label: string;
  tagName: "input";
  type: "checkbox";
  values: { label: string; value: number }[];
};

type SelectTag = {
  name: string;
  label: string;
  tagName: "select";
  options: { text: string; value: number }[];
};

type TextareaTag = {
  name: string;
  label: string;
  tagName: "textarea";
  placeholder?: string;
};

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

function createInputText(item: TextInput) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <input type="${item.type}" placeholder="${item.placeholder}" name="${item.name}" />
      </td>
    </tr>
  `;
}

function createButtons(type: string, name: string, values: {label: string, value: number}[]) {
  return values.map(value => `
    <input type="${type}" id="${value.value}" name="${name}">
    <label for="${value.value}">${value.label}</label>
  `).join();
}

function createInputButton(item: Radio | Checkbox) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${createButtons(item.type, item.name, item.values)}
      </td>
    </tr>
  `;
}

function createInputRow(item: InputTag) {
  switch(item.type) {
    case "checkbox": case "radio":
      return createInputButton(item);
    case "email": case "text": case "text":
      return createInputText(item);
    default:
      // ts-expect-error
      console.log(item);
  }
}

function createOptions(options: Option[]) {
  return options.map(option => `<option value=${option.value}>${option.text}</option>`).join();
}

function createSelectRow(item: SelectTag) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <select name=${item.name}>
          ${createOptions(item.options)}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextareaTag) {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <textarea name=${item.name}>${item.placeholder}</textarea>
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
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  form.innerHTML = createTable();
}

createFormDom();
