

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

import { OptionsDateTimeFilter } from "@/lib/data";

const DateTimeFilters = ({ filterDateTime, setFilterDateTime }) => {
  const frameworks = OptionsDateTimeFilter;

  const selectedItem = frameworks.find((i) => i.value === filterDateTime);
  const label = selectedItem?.label || "";

  const onValueChange = (data) => {
    console.log("Data:", data);
    setFilterDateTime(data.value);
  };

  return (
    <Combobox
      items={frameworks}
      value={label}
      onValueChange={onValueChange}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Bộ lọc theo thời gian" />

      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilters;
