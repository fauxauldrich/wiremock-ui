// @ts-ignore
import * as JSONEditor from "@json-editor/json-editor";
import { Mapping } from "./models/Mapping";
import { WIREMOCK_SCHEMA } from "./models/schema/schema";
import WiremockService from "./services/wiremock";
const $ = require("jquery");
const dt = require("datatables.net");
JSONEditor.__proto__.constructor();
$(document).ready(() => {
  const wiremockService = new WiremockService($);
  if (location.pathname === "/") {
    const elem = document.getElementById("editor");
    let options = {
      schema: WIREMOCK_SCHEMA,
      theme: "spectre",
      display_required_only: true,
      array_controls_top: true,
      iconlib: "spectre",
      form_name_root: "mapping",
      remove_button_labels: true,
    };
    if (localStorage.getItem("edit-mapping")) {
      // @ts-ignore
      options["startval"] = <Mapping>JSON.parse(<string>localStorage.getItem("edit-mapping"));
      localStorage.clear();
      $("#createMapping").text("Update Mapping");
    }
    const editor = new (<any>window).JSONEditor(elem, options);
    $("#createMapping").click((e: any) => {
      e.preventDefault();
      const errors = editor.validate();
      if (errors.length) {
        console.log(errors);
      } else {
        if ($("#createMapping").text() === "Update Mapping") {
          wiremockService
            .updateMapping(editor.getValue().id, editor.getValue())
            .then(() => {
              alert(`Service Successfully Created`);
              location.reload();
            })
            .catch((err) => {
              alert("Something went wrong. Check console and network for more details");
              console.log(err);
            });
          localStorage.clear();
        } else {
          wiremockService
            .createMapping(editor.getValue())
            .then(() => {
              alert(`Service Successfully Created`);
              location.reload();
            })
            .catch((err) => {
              alert("Something went wrong. Check console and network for more details");
              console.log(err);
            });
        }
      }
    });
  }
  if (location.pathname.indexOf("mappings") != -1) {
    wiremockService.getMappings().then((data) => {
      let mappings = data.mappings;
      $("#mapping-table").html("");
      var result = mappings.map((mapping: any) => {
        var result = [];
        let url = "----";
        if ("url" in mapping.request) {
          url = mapping.request.url;
        }
        if ("urlPath" in mapping.request) {
          url = mapping.request.urlPath;
        }
        if ("urlPattern" in mapping.request) {
          url = mapping.request.urlPattern;
        }
        if ("urlPathPattern" in mapping.request) {
          url = mapping.request.urlPathPattern;
        }
        result.push(url);
        result.push(`<button id="${mapping.id}-edit" class="btn btn-primary btn-sm edit"><i class="icon icon-edit"></i></button>`);
        result.push(`<button id="${mapping.id}-delete" class="btn btn-error btn-sm delete"><i class="icon icon-delete"></i></button>`);
        return result;
      });
      $("#mappings").DataTable({
        aaData: result,
        aoColumns: [{ sTitle: "Mapping" }, { sTitle: "Edit" }, { sTitle: "Delete" }],
        deferRender: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        sDom: "lfrtip",
        fnCreatedRow: function (nRow: any, aData: any, iDataIndex: any) {
          $(nRow).attr("id", aData[0]);
        },
      });
      $(document).on("click", ".edit", (e: any) => {
        let mappingId = e.currentTarget.id.replace("-edit", "");
        wiremockService.getSingleMapping(mappingId).then((mapping) => {
          localStorage.setItem("edit-mapping", JSON.stringify(mapping));
          location.href = "/";
        });
      });
      $(document).on("click", ".delete", (e: any) => {
        let mappingId = e.currentTarget.id.replace("-delete", "");
        wiremockService.deleteMapping(mappingId).then(() => {
          location.reload();
        });
      });
    });
    $("#saveMappings").click((e: any) => {
      e.preventDefault();
      wiremockService
        .save()
        .then(() => alert("Stub Mappings Saved"))
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });
    });
    $("#resetMappings").click((e: any) => {
      e.preventDefault();
      wiremockService
        .reset()
        .then(() => alert("Stub Mappings Reset"))
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });
    });
  }
});
