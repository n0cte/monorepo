import {
  Env,
  InterfaceImplementations,
  PluginPackage,
  PluginRegistration,
  Uri,
  UriRedirect,
  Web3ApiClientConfig,
} from "@web3api/client-js";
import { intlMsg } from "../intl";

export function validateRedirects<TUri extends PluginPackage | Uri | string>(
  redirects: UriRedirect<TUri>[]
) {
  if (!Array.isArray(redirects)) {
    throw new Error(intlMsg.commands_query_error_redirectsExportNotArray());
  }

  // Ensure each redirect in the array is valid
  for (let i = 0; i < redirects.length; ++i) {
    const redirect = redirects[i];

    if (typeof redirect !== "object" || !redirect.from || !redirect.to) {
      throw new Error(
        intlMsg.commands_query_error_redirectsItemNotValid({
          index: i.toString(),
        })
      );
    } else if (typeof redirect.from !== "string") {
      throw new Error(
        intlMsg.commands_query_error_redirectsItemFromNotString({
          index: i.toString(),
        })
      );
    } else if (
      typeof redirect.to !== "string" &&
      typeof redirect.to !== "object"
    ) {
      throw new Error(
        intlMsg.commands_query_error_redirectsItemToNotStringOrObject({
          index: i.toString(),
        })
      );
    } else if (
      typeof redirect.to === "object" &&
      (typeof redirect.to.factory !== "function" ||
        typeof redirect.to.manifest !== "object")
    ) {
      throw new Error(
        intlMsg.commands_query_error_redirectsItemToNotValidPlugin({
          index: i.toString(),
        })
      );
    }
  }
}

export function validatePlugins<TUri extends Uri | string = string>(
  plugins: PluginRegistration<TUri>[]
) {
  if (!Array.isArray(plugins)) {
    throw new Error(intlMsg.commands_query_error_pluginsExportNotArray());
  }

  // Ensure each plugin in the array is valid
  for (let i = 0; i < plugins.length; ++i) {
    const plugin = plugins[i];
    if (typeof plugin !== "object") {
      throw new Error(
        intlMsg.commands_query_error_pluginsItemNotObject({
          index: i.toString(),
        })
      );
    } else if (typeof plugin.uri !== "string") {
      throw new Error(
        intlMsg.commands_query_error_pluginsItemUriNotString({
          index: i.toString(),
        })
      );
    } else if (typeof plugin.plugin !== "object") {
      throw new Error(
        intlMsg.commands_query_error_pluginsItemPluginNotObject({
          index: i.toString(),
        })
      );
    } else if (typeof plugin.plugin.factory !== "function") {
      throw new Error(
        intlMsg.commands_query_error_pluginsItemPluginFactoryNotFunction({
          index: i.toString(),
        })
      );
    } else if (typeof plugin.plugin.manifest !== "object") {
      throw new Error(
        intlMsg.commands_query_error_pluginsItemPluginManifestNotObject({
          index: i.toString(),
        })
      );
    }
  }
}

export function validateInterfaces<TUri extends Uri | string = string>(
  interfaces: InterfaceImplementations<TUri>[]
) {
  if (!Array.isArray(interfaces)) {
    throw new Error(intlMsg.commands_query_error_interfacesExportNotArray());
  }
  // Ensure each interface in the array is valid
  for (let i = 0; i < interfaces.length; ++i) {
    const interfaceImplementations = interfaces[i];
    if (typeof interfaceImplementations !== "object") {
      throw new Error(
        intlMsg.commands_query_error_interfacesItemNotObject({
          index: i.toString(),
        })
      );
    } else if (typeof interfaceImplementations.interface !== "string") {
      throw new Error(
        intlMsg.commands_query_error_interfacesItemInterfaceNotString({
          index: i.toString(),
        })
      );
    } else if (!Array.isArray(interfaceImplementations.implementations)) {
      throw new Error(
        intlMsg.commands_query_error_interfacesItemImplementationsNotArray({
          index: i.toString(),
        })
      );
    } else if (
      interfaceImplementations.implementations.length === 0
    ) {
      throw new Error(
        intlMsg.commands_query_error_interfacesItemImplementationsEmpty({
          index: i.toString(),
        })
      );
    }
    for (let j = 0; j < interfaceImplementations.implementations.length; ++j) {
      const implementation = interfaceImplementations.implementations[j];
      if (typeof implementation !== "string") {
        throw new Error(
          intlMsg.commands_query_error_interfacesItemImplementationsItemNotString({
            index: i.toString(),
            implementationIndex: j.toString(),
          })
        );
      }
    }
  }
}

export function validateEnvs<TUri extends Uri | string = string>(envs: Env<TUri>[]) {
  if (!Array.isArray(envs)) {
    throw new Error(intlMsg.commands_query_error_envsExportNotArray());
  }
  for (let i = 0; i < envs.length; ++i) {
    const env = envs[i];
    if (typeof env !== "object") {
      throw new Error(
        intlMsg.commands_query_error_envsItemNotObject({
          index: i.toString(),
        })
      );
    } else if (typeof env.uri !== "string") {
      throw new Error(
        intlMsg.commands_query_error_envsItemUriNotString({
          index: i.toString(),
        })
      );
    } else if (!env.common && typeof env.common !== "object") {
      throw new Error(
        intlMsg.commands_query_error_envsItemCommonNotObject({
          index: i.toString(),
        })
      );
    } else if (!env.mutation && typeof env.mutation !== "object") {
      throw new Error(
        intlMsg.commands_query_error_envsItemMutationNotObject({
          index: i.toString(),
        })
      );
    } else if (!env.query && typeof env.query !== "object") {
      throw new Error(
        intlMsg.commands_query_error_envsItemQueryNotObject({
          index: i.toString(),
        })
      );
    }
  }
}

export function validateConfigs(
  configs: Partial<Web3ApiClientConfig>
) {
  if (!configs || typeof configs !== "object") {
    throw new Error(intlMsg.commands_query_error_configsNotObject());
  } 
  if (configs.plugins) validatePlugins(configs.plugins);
  if (configs.envs) validateEnvs(configs.envs);
  if (configs.interfaces) validateInterfaces(configs.interfaces);
  if (configs.redirects) validateRedirects(configs.redirects);
}
