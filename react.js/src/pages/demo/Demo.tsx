import { useState, useEffect } from "react";
import "./demo.scss";

import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";

// const colsMainProduct: GridColDef[] = [
//   // { field: "id", headerName: "", width: 90 },
//   {
//     field: "title",
//     type: "string",
//     headerName: "Title",
//     width: 250,
//   },
// ];

let mainProduct = [];
let exRefProduct = [];
let exCrpClass = [];
let exUnitOfMeasure = [];
let exProductContainer = [];
let exProductAltId = [];
let exProductAltIdItem = [];
let exProductLabelItem = [];

const Demo = () => {
  const [demo, setDemo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // test=Test!23
      const result = await axios("http://localhost:5012/api/Demo", {
        headers: {
          "Authorization": "Basic dGVzdDpUZXN0ITIz",
          "Content-Type": "application/json",
          "Accept": "*"
        },
        // withCredentials: true
      });
      setDemo(result.data);
      console.log("useEffect component mount", result.data);
    };
    fetchData();
  }, []);

  if (!demo) {
    return;
  }
  
  console.log(demo);

  let normalize = (src: Object, ex: []) : [] => {
    let dst = [];
    for (const x in src) {
      if (['string', 'number'].includes(typeof src[x])) {
        if (!ex.includes(x)) {
          dst.push({ key: x,  value: typeof src[x] ==='string' ? src[x].trim() : (src[x] + '') });
        }
      }
    }
    return dst;
  }
  let normalizeAny = (src: any, lvl: number, dst: []) : [] => {
    if (Array.isArray(src)) {
      src.forEach(x => {
        if (['string', 'number'].includes(typeof x)) {
          dst.push({ key: x.padStart(x.length + lvl * 4, ' '),  value: typeof src[x] ==='string' ? src[x].trim() : (src[x] + ''), lvl: lvl })
        } else {
          normalizeAny(x, lvl + 1, dst);
        }
      });
    } else {
      for (const k in src) {
        if (['string', 'number'].includes(typeof src[k])) {
          dst.push({ key: k.padStart(k.length + lvl * 4, ' '),  value: typeof src[k] ==='string' ? src[k].trim() : (src[k] + ''), lvl: lvl })
        } else {
          dst.push({ key: k.padStart(k.length + lvl * 4, ' '),  value: '', lvl: lvl })
          normalizeAny(src[k], lvl + 1, dst);
        }
      }
    }
    return dst;
  }

  mainProduct = normalize(demo, ['rowidObject', 'label']);
  exRefProduct = normalize(demo.ExRefProduct, ['ExCrpClass', 'ExUnitOfMeasure']);
  exCrpClass = normalize(demo.ExRefProduct.ExCrpClass, []);
  exUnitOfMeasure = normalize(demo.ExRefProduct.ExUnitOfMeasure, []);
  exProductContainer = normalize(demo.ExRefProduct.ExProductContainer, []);
  exProductAltId = normalize(demo.ExProductAltId, []);
  exProductAltIdItem = [{ key: 'item',  value: ''}];
  exProductAltIdItem = normalizeAny(demo.ExProductAltId.item, 0, exProductAltIdItem);
  exProductLabelItem = [{ key: 'item',  value: ''}];
  exProductLabelItem = normalizeAny(demo.ExRefProduct.ExProductContainer.item, 0, exProductLabelItem);

  return (
    <div className="home">
      <div className="box box1">
        <div className="activities">
          <h3>{demo.label} ({demo.rowidObject})</h3>
          {(
            <ul>
              {mainProduct.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="box box4">
        <h3>ExRefProduct</h3>
        {(
            <ul>
              {exRefProduct.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

        <div className="box">
          <h4>ExCrpClass</h4>
          {(
            <ul>
              {exCrpClass.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <h4>ExUnitOfMeasure</h4>
          {(
            <ul>
              {exUnitOfMeasure.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="box">
          <h4>ExProductContainer</h4>
          {(
            <ul>
              {exProductContainer.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="box">
            <h4>Links</h4>
          </div>
          <div className="box">
            <h4>Items</h4>
            {(
            <ul>
              {exProductLabelItem.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
      </div>
      <div className="box box4">
        <h3>ExProductAltId</h3>
        {(
            <ul>
              {exProductAltId.map((activity) => (
                <li key={activity.key}>
                  <div>
                  <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        <div className="box">
          <h4>Links</h4>
        </div>
        <div className="box">
            <h4>Items</h4>
            {(
            <ul>
              {exProductAltIdItem.map((activity) => (
                <li key={activity.key}>
                  <div>
                    <p>{activity.key} {activity.value.length > 0 ? ':' : ''} {activity.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* <br /> */}
        </div>
      </div>
    </div>
  );
};

export default Demo;
