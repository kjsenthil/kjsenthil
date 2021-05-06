resource "azurerm_api_management_api_operation" "api_operation" {
  operation_id        = var.operation_id
  api_name            = var.apima_name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name
  display_name        = var.display_name
  method              = var.method
  url_template        = var.url_template
  description         = var.description

  response {
    status_code = 200
    dynamic "representation" {
      for_each = var.is_mock ? [1] : []
      content {
        content_type = var.mock_data_type
        sample       = var.mock_sample
      }
    }
  }

  dynamic "template_parameter" {
    for_each = length(var.path_params) > 0 ? toset(var.path_params) : []
    content {
      name     = template_parameter.key
      required = true
      type     = "string"
    }
  }
}