resource "azurerm_resource_group" "prod_resource_group" {
  name     = format("%s-%s-rg", local.environment, local.rg_name)
  location = local.location
}

module "prod_main" {
  source             = "../../main"
  is_apim            = true
  is_apima           = true
  environment        = local.environment
  environment_prefix = local.environment
  rg_name            = azurerm_resource_group.prod_resource_group.name
  apim_name          = format("%s-%s-mgmt", local.environment, local.apim_name)
  path               = local.path
}

# The API operation deployed in Production.
resource "azurerm_api_management_api_operation" "api_operation" {
  for_each            = local.api_definitions
  operation_id        = each.value.operation_id
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  display_name        = each.value.display_name
  method              = each.value.method
  url_template        = each.value.url_template
  description         = each.value.description

  response {
    status_code = 200
  }

  dynamic "template_parameter" {
    for_each = each.value.path_params.has_params ? toset(split(", ", each.value.path_params.param_names)) : []
    content {
      name     = template_parameter.key
      required = true
      type     = "string"
    }
  }

  depends_on = [module.prod_main]
}

# The API operation policy For the API. Deployed in Production.
resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  for_each            = local.api_definitions
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  operation_id        = each.value.operation_id
  xml_content         = templatefile(abspath(format("%s/../../modules/policy_documents/api_operation_policy.xml", path.module)), { config = { backend_url = each.value.policy.backend_url, cors_allowed_methods = split(", ", each.value.policy.cors.methods), cors_allowed_headers = split(", ", each.value.policy.cors.headers), cors_exposed_headers = split(", ", each.value.policy.cors.expose_headers), cors_allowed_origins = split(", ", each.value.policy.cors.allowed_origins), headers = each.value.policy.set_header } })
  depends_on          = [module.prod_main, azurerm_api_management_api_operation.api_operation]
}

# Storage account for front-end
resource "azurerm_storage_account" "front_end_storage_account" {
  name                      = format("%s%s", "dighybpr", local.environment)
  resource_group_name       = format("%s-%s-rg", local.environment, local.rg_name)
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  dynamic "static_website" {
    for_each = local.if_static_website_enabled
    content {
      index_document     = "index.html"
      error_404_document = "error.html"
    }
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

# Storage account for storybook
resource "azurerm_storage_account" "storybook_storage_account" {
  name                      = format("%s%s", "dighybsb", local.environment)
  resource_group_name       = format("%s-%s-rg", local.environment, local.rg_name)
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  dynamic "static_website" {
    for_each = local.if_storybook_enabled
    content {
      index_document = "index.html"
    }
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
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
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
  depends_on = [module.prod_main, azurerm_api_management_api_operation.api_operation]
}


# The API operation policy For the endpoints API.
resource "azurerm_api_management_api_operation_policy" "endpoints_api_operation_policy" {
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  operation_id        = "get-endpoints"
  xml_content         = <<XML
                          <policies>
                            <inbound>
                              <mock-response status-code="200" content-type="application/json"/>
                            </inbound>
                          </policies>
                          XML
  depends_on          = [azurerm_api_management_api_operation.endpoints_api_operation]
}