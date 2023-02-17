// See https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#http-requests
export type RequestContext = {
  http: {
    method: string;
    url: string;
    request_id: string;
  };
};
