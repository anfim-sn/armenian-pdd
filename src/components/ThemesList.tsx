import { groupsByTheme } from "../data/groupsByTheme";
import { GroupWithQuestons } from "../types/group";
import { Theme } from "./Theme";

type ThemeListProps = {
  groups: GroupWithQuestons[];
  handleGroup: Function;
};

export const ThemesList = ({ groups, handleGroup }: ThemeListProps) => {
  return (
    <ul>
      {groups.map(({ groupId, groupName, questions }) => (
        <Theme key={groupId} id={groupId} handleTheme={handleGroup}>
          {groupName} ({questions.length})
        </Theme>
      ))}
    </ul>
  );
};
