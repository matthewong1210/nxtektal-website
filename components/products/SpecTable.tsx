import type { SpecGroup } from "../../lib/products/ce82a";

/**
 * Grouped specification tables. One <table> per group keeps the group title
 * as a real caption and the parameter name as a row header, so a screen
 * reader hears "Collection width: 2 m" and a phone shows name and value side
 * by side without a horizontal scroll (two columns that wrap).
 */
export default function SpecTable({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="pd-specs">
      {groups.map((group) => (
        <table className="pd-table" key={group.title}>
          <caption>{group.title}</caption>
          <tbody>
            {group.rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td>
                  <span className="pd-value">{row.value}</span>
                  {row.note && <span className="pd-spec-note">{row.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
