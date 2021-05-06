resource "azurerm_api_management_api" "api" {
  name                  = local.apima_name
  resource_group_name   = local.rg_name
  api_management_name   = local.apim_name
  revision              = 1
  display_name          = format("%s-digital-hybrid-API", local.environment_prefix)
  path                  = local.path
  protocols             = ["https"]
  subscription_required = false
  description           = format("%s digital hybrid api", local.environment_prefix)
}


# The API operation deployed on every PR.
resource "azurerm_api_management_api_operation" "api_operation" {
  for_each            = local.api_definitions
  operation_id        = lookup(each.value, "operation_id", null)
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management_api.api.api_management_name
  resource_group_name = azurerm_api_management_api.api.resource_group_name
  display_name        = lookup(each.value, "display_name", null)
  method              = lookup(each.value.policy.cors, "method", null)
  url_template        = lookup(each.value, "url_template", null)
  description         = lookup(each.value, "description", null)

  response {
    status_code = 200
  }

  dynamic "template_parameter" {
    for_each = length(lookup(each.value, "path_params", [])) > 0 ? toset(lookup(each.value, "path_params", [])) : []
    content {
      name     = template_parameter.key
      required = true
      type     = "string"
    }
  }
}


# The API operation policy For the API. Deployed with every PR.
resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  for_each            = local.api_definitions
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management_api.api.api_management_name
  resource_group_name = azurerm_api_management_api.api.resource_group_name
  operation_id        = lookup(each.value, "operation_id", null)
  xml_content         = templatefile(abspath(format("%s/../../../modules/policy_documents/api_operation_policy.xml", path.module)), { config = { backend_url = lookup(each.value.policy, "backend_url", null), rewrite_url = lookup(each.value.policy, "rewrite_url", null), cors_allowed_method = lookup(each.value.policy.cors, "method", null), cors_allowed_headers = lookup(each.value.policy.cors, "headers", null), cors_exposed_headers = lookup(each.value.policy.cors, "expose_headers", null), cors_allowed_origins = coalescelist(lookup(each.value.policy.cors, "allowed_origins", []), concat(var.cors_allowed_origins,[azurerm_storage_account.front_end_storage_account.primary_web_endpoint])), allow-credentials = lookup(each.value.policy.cors, "allow-credentials", false), headers = lookup(each.value.policy, "set_header", null), outbound_headers = lookup(each.value.policy, "outbound_headers", null) } })
  depends_on          = [azurerm_api_management_api_operation.api_operation]
}

# Storage account for Digital Hybrid front-end. Deployed on every PR.
resource "azurerm_storage_account" "front_end_storage_account" {
  name                      = format("%s%s", "dighybpr", var.environment_prefix)
  resource_group_name       = local.rg_name
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true
  tags                      = local.default_tags

  static_website {
    index_document     = "index.html"
    error_404_document = "error.html"
  }

  blob_properties {
    cors_rule {
      allowed_methods    = ["GET", "HEAD", "POST", "OPTIONS", "PUT"]
      allowed_origins    = ["*"]
      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 60 * 60 * 24 * 2
    }
  }

  identity {
    type = "SystemAssigned"
  }
}


# Storage account for dev storybook. Deployed on every PR.
resource "azurerm_storage_account" "storybook_storage_account" {
  name                      = format("%s%s", "dighybsbpr", var.environment_prefix)
  resource_group_name       = local.rg_name
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true
  tags                      = local.default_tags

  static_website {
    index_document = "index.html"
  }

  blob_properties {
    cors_rule {
      allowed_methods    = ["GET", "HEAD", "POST", "OPTIONS", "PUT"]
      allowed_origins    = ["*"]
      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 60 * 60 * 24 * 2
    }
  }

  identity {
    type = "SystemAssigned"
  }
}


# The API operation to get Endpoints
resource "azurerm_api_management_api_operation" "endpoints_api_operation" {
  operation_id        = "get-endpoints"
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management_api.api.api_management_name
  resource_group_name = azurerm_api_management_api.api.resource_group_name
  display_name        = "get-endpoints"
  method              = "GET"
  url_template        = "/endpoints"
  description         = "Returns a JSON object with all the API endpoints."

  response {
    status_code = 200
    representation {
      content_type = "application/json"
      sample       = local.endpoints
    }
  }
  depends_on = [azurerm_api_management_api_operation.api_operation]
}


# The API operation policy For the endpoints API. Deployed with every PR.
resource "azurerm_api_management_api_operation_policy" "endpoints_api_operation_policy" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = azurerm_api_management_api.api.api_management_name
  resource_group_name = azurerm_api_management_api.api.resource_group_name
  operation_id        = azurerm_api_management_api_operation.endpoints_api_operation.operation_id
  xml_content         = <<XML
                          <policies>
                            <inbound>
                              <mock-response status-code="200" content-type="application/json"/>
                            </inbound>
                          </policies>
                          XML
}

# TODO: Seems to have an issue when more than one app service plan is created. 
# resource "azurerm_app_service_plan" "api_functions" {
#   name                = "${var.environment_prefix}${local.environment}"
#   resource_group_name = local.rg_name
#   location            = local.location
#   kind                = "FunctionApp"
#   reserved = true

#   sku {
#     tier = "Dynamic"
#     size = "Y1"
#   }
# }

# Example implementation for deploying a function app.
# module "function_app_projections" {
#   source = "../../../modules/function_app_node"

#   resource_group_name = local.rg_name
#   location            = local.location
#   app_service_plan_id = azurerm_app_service_plan.api_functions.id

#   name          = "${var.environment_prefix}${local.environment}projections"
#   app_code_path = var.projections_function_app_code_path
#   os_type       = "linux"
#   node_version  = "12.9"

#   tags = local.default_tags
# }
