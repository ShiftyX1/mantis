package mappers

import (
	"encoding/json"

	"mantis/core/types"
	"mantis/infrastructure/models"
)

func PlanToRow(p types.Plan) models.PlanRow {
	graph, _ := json.Marshal(p.Graph)
	params := p.Parameters
	if len(params) == 0 {
		params = json.RawMessage(`{}`)
	}
	return models.PlanRow{
		ID:          p.ID,
		Name:        p.Name,
		Description: p.Description,
		Schedule:    p.Schedule,
		Enabled:     p.Enabled,
		Parameters:  params,
		Graph:       graph,
	}
}

func PlanFromRow(r models.PlanRow) types.Plan {
	var graph types.PlanGraph
	_ = json.Unmarshal(r.Graph, &graph)
	if graph.Nodes == nil {
		graph.Nodes = []types.PlanNode{}
	}
	if graph.Edges == nil {
		graph.Edges = []types.PlanEdge{}
	}
	params := r.Parameters
	if len(params) == 0 {
		params = json.RawMessage(`{}`)
	}
	return types.Plan{
		ID:          r.ID,
		Name:        r.Name,
		Description: r.Description,
		Schedule:    r.Schedule,
		Enabled:     r.Enabled,
		Parameters:  params,
		Graph:       graph,
	}
}
