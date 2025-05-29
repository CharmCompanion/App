import React, { useState } from 'react';
import '../pages/hunts.css';
import modIcons from '../data/modIcons';

type ModState = 'Base' | 'Fail' | 'Pass';
type ModEntry = { name: string; state: ModState };
type Row = ModEntry[];

const emptyMod: ModEntry = { name: '', state: 'Base' };

export default function Hunts() {
  const [activeRow, setActiveRow] = useState<Row>(Array(3).fill({ ...emptyMod }));
  const [rows, setRows] = useState<Row[]>(Array(5).fill(null).map(() => Array(3).fill({ ...emptyMod })));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleModChange = (index: number, name: string) => {
    const updated = [...activeRow];
    updated[index] = { name, state: 'Base' };
    setActiveRow(updated);
  };

  const toggleModState = (index: number) => {
    const updated = [...activeRow];
    const curr = updated[index];
    if (!curr.name) return;
    const newState: ModState = curr.state === 'Base' ? 'Fail' : curr.state === 'Fail' ? 'Pass' : 'Base';
    updated[index] = { ...curr, state: newState };
    setActiveRow(updated);
  };

  const handleCopyRow = (i: number) => {
    const updated = [...rows];
    updated[i] = [...activeRow];
    setRows(updated);
  };

  const handleClear = () => {
    setActiveRow(Array(3).fill({ ...emptyMod }));
    setRows(Array(5).fill(null).map(() => Array(3).fill({ ...emptyMod })));
  };

  const handleSuggest = () => {
    const guesses: Row = [
      { name: 'Fass', state: 'Base' },
      { name: 'Lohk', state: 'Base' },
      { name: 'Netra', state: 'Base' }
    ];
    setActiveRow(guesses);
  };

  const handleDragStart = (i: number) => setDraggedIndex(i);
  const handleDrop = (i: number) => {
    if (draggedIndex === null || draggedIndex === i) return;
    const updated = [...activeRow];
    const temp = updated[draggedIndex];
    updated[draggedIndex] = updated[i];
    updated[i] = temp;
    setActiveRow(updated);
    setDraggedIndex(null);
  };

  const renderModImage = (mod: ModEntry, index: number, isActive: boolean) => {
    const src = mod.name ? modIcons[`${mod.name}${mod.state === 'Base' ? '' : mod.state[0]}`] : '';
    const tooltip = `${mod.name}${mod.state !== 'Base' ? ' - ' + mod.state : ''}`;
    const props: any = {};

    if (isActive) {
      props.onClick = () => toggleModState(index);
      props.draggable = true;
      props.onDragStart = () => handleDragStart(index);
      props.onDragOver = (e: any) => e.preventDefault();
      props.onDrop = () => handleDrop(index);
    }

    return (
      <div className={`mod-box ${mod.state.toLowerCase()}`} {...props}>
        {mod.name && <img src={src} alt={tooltip} title={tooltip} className={`mod-img ${mod.state.toLowerCase()}`} />}
      </div>
    );
  };

  return (
    <div className="hunts-container">
      <h2>REQUIEM MOD TRACKER</h2>

      <div className="tracker-body">
        <div className="control-button-stack">
          <button className="control-button" onClick={handleClear}>Clear</button>
          <button className="control-button" onClick={handleSuggest}>Suggest</button>
        </div>

        {[0, 1, 2].map((i) =>
          activeRow[i].name ? (
            renderModImage(activeRow[i], i, true)
          ) : (            <select 
              key={i} 
              className="mod-select" 
              onChange={(e) => handleModChange(i, e.target.value)}
              aria-label={`Select mod for position ${i + 1}`}
              title={`Select mod for position ${i + 1}`}>
              <option value="">Select Mod</option>
              {Object.keys(modIcons)
                .filter((k) => !k.includes('F') && !k.includes('P'))
                .map((name) => (
                  <option key={name} value={name.replace('.png', '')}>
                    {name.replace('.png', '')}
                  </option>
                ))}
            </select>
          )
        )}

        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <button className="row-button" onClick={() => handleCopyRow(rowIndex)}>
              {rowIndex + 1}
            </button>
            {row.map((mod, i) => (
              <div key={i} className={`mod-box ${mod.state.toLowerCase()}`}>
                {mod.name && (
                  <img
                    src={modIcons[`${mod.name}${mod.state === 'Base' ? '' : mod.state[0]}`]}
                    alt={mod.name}
                    title={`${mod.name} - ${mod.state}`}
                    className={`mod-img ${mod.state.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
