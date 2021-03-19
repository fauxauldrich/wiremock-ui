import { ENV } from "../config";
import { Mapping } from "../models/Mapping";

export default class WiremockService {
  private $: any;
  constructor($: any) {
    this.$ = $;
  }
  private WIREMOCK_URL: string = `http://${ENV.WIREMOCK_HOST}:${ENV.WIREMOCK_PORT}`;
  createMapping = (mapping: Mapping): Promise<any> => {
    return this.$.ajax({
      url: `${this.WIREMOCK_URL}/__admin/mappings`,
      type: "POST",
      data: JSON.stringify(mapping),
      dataType: "json",
      contentType: "application/json",
    });
  };

  getMappings = (): Promise<any> => {
    return this.$.get(`${this.WIREMOCK_URL}/__admin/mappings`);
  };

  getSingleMapping = (id: string): Promise<any> => {
    return this.$.get(`${this.WIREMOCK_URL}/__admin/mappings/${id}`);
  };

  deleteMapping = (id: string): Promise<any> => {
    return this.$.ajax({
      url: `${this.WIREMOCK_URL}/__admin/mappings/${id}`,
      type: "DELETE",
    });
  };

  updateMapping = (id: string, mapping: Mapping): Promise<any> => {
    return this.$.ajax({
      url: `${this.WIREMOCK_URL}/__admin/mappings/${id}`,
      type: "PUT",
      data: JSON.stringify(mapping),
      dataType: "json",
      contentType: "application/json",
    });
  };

  save = (): Promise<any> => {
    return this.$.ajax({
      url: `${this.WIREMOCK_URL}/__admin/mappings/save`,
      type: "POST",
    });
  };

  reset = (): Promise<any> => {
    return this.$.ajax({
      url: `${this.WIREMOCK_URL}/__admin/mappings/reset`,
      type: "POST",
    });
  };
}
