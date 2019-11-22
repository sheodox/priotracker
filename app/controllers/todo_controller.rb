class TodoController < ApplicationController
  def index
    todos = {
      high: Todo.where(priority: 1),
      medium: Todo.where(priority: 2),
      low: Todo.where(priority: 3)
    }
    respond_to do |format|
      format.json { render json: todos }
    end
  end

  def create
    Todo
      .new(todo_params)
      .save
    index
  end

  def destroy
    todo = Todo.find(params[:id])
    todo&.destroy
    index
  end

  def update
    todo = Todo.find(params[:id])
    todo&.update todo_params
    index
  end

  def show_all
    Todo.where(priority: params[:priority]).update_all(visible: true)
    index
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :description, :priority, :visible)
  end
end
