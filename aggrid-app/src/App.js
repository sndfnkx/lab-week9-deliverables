import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnDefs = useMemo(() => ([
    { field: 'full_name', headerName: 'Name', sortable: true, filter: true },
    { field: 'html_url', headerName: 'URL', sortable: true, filter: true,
      cellRenderer: (params) => {
        const url = params.value;
        return url ? <a href={url} target="_blank" rel="noreferrer">{url}</a> : '';
      }
    },
    { headerName: 'Owner', sortable: true, filter: true,
      valueGetter: (params) => params.data?.owner?.login ?? '' }
  ]), []);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch('https://api.github.com/search/repositories?q=react&per_page=50');
        const data = await resp.json();
        setRowData(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>GitHub Repositories (AG Grid)</h1>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
    </div>
  );
}

export default App;
