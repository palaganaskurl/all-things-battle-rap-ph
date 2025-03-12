"use client";

import { MultiSelect } from "@/components/ui/multi-select-combo-box";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ComboBoxItem = {
  value: string;
  label: string;
};

export default function BattleFilters({
  battleLeaguesAsComboBoxItems,
  emceesAsComboBoxItems,
  defaultBattleLeagues,
  defaultEmcees,
  page,
}: {
  battleLeaguesAsComboBoxItems: ComboBoxItem[];
  emceesAsComboBoxItems: ComboBoxItem[];
  defaultBattleLeagues: ComboBoxItem[];
  defaultEmcees: ComboBoxItem[];
  page: "word-plays" | "letter-plays";
}) {
  const router = useRouter();
  const [selectedBattleLeagues, setSelectedBattleLeagues] = useState<string[]>(
    defaultBattleLeagues.map((item) => item.value)
  );
  const [selectedEmcees, setSelectedEmcees] = useState<string[]>(
    defaultEmcees.map((item) => item.value)
  );

  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <div className="md:w-[35%] w-full">
        <MultiSelect
          options={battleLeaguesAsComboBoxItems}
          placeholder="Filter Battle League"
          onChange={(selectedItems) => {
            setSelectedBattleLeagues(selectedItems.map((item) => item.value));
          }}
          defaultValue={defaultBattleLeagues}
          instanceId="battle-league-options"
        />
      </div>
      <div className="md:w-[50%] w-full">
        <MultiSelect
          options={emceesAsComboBoxItems}
          placeholder="Filter Emcees"
          onChange={(selectedItems) => {
            setSelectedEmcees(selectedItems.map((item) => item.value));
          }}
          defaultValue={defaultEmcees}
          instanceId="emcee-options"
        />
      </div>
      <div className="md:w-[15%] w-full">
        <Button
          className="w-full"
          onClick={() => {
            router.push(
              `${page}?battleLeagues=${selectedBattleLeagues.join(
                ","
              )}&emcees=${selectedEmcees.join(",")}`
            );
          }}
        >
          <RefreshCw /> Filter Battles
        </Button>
      </div>
    </div>
  );
}
