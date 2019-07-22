import { Tab } from 'components/Tab/Tab'
import { TabContent } from 'components/Tab/TabContent/TabContent'
import { TabItem } from 'components/Tab/TabItem/TabItem'
import { LibraryScreenContextProvider } from 'contexts/LibraryScreenContext'
import { OverviewScreenContextProvider } from 'contexts/OverviewScreenContext'
import { PluginsContextContextProvider } from 'contexts/PluginsContext'
import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { LibraryRoute } from 'routes/LibraryRoute'
import { OverviewRoute } from 'routes/OverviewRoute'
import { SettingsRoute } from 'routes/SettingsRoute'

export const App = (): React.ReactElement<object> => {
    return (
        <HashRouter>
            <Tab>
                <TabItem linkTo="/overview">Overview</TabItem>
                <TabItem linkTo="/library">Library</TabItem>
                <TabItem linkTo="/settings">Settings</TabItem>
            </Tab>
            <TabContent>
                <PluginsContextContextProvider>
                    <OverviewScreenContextProvider>
                        <LibraryScreenContextProvider>
                            <Switch>
                                <Route path="/overview" name="Overview" component={OverviewRoute} />
                                <Route path="/library" name="Library" component={LibraryRoute} />
                                <Route path="/settings" name="Settings" component={SettingsRoute} />
                                <Redirect from="/" to="/overview" />
                            </Switch>
                        </LibraryScreenContextProvider>
                    </OverviewScreenContextProvider>
                </PluginsContextContextProvider>
            </TabContent>
        </HashRouter>
    )
}
