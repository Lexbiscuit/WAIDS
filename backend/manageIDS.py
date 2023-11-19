import os
from suricataparser import parse_rule, parse_rules
from flask import Blueprint, jsonify, request

manageIDS = Blueprint('manageIDS', __name__)
localRules = "./suricata.rules"


def readRulesFile(filename: str):
    with open(filename, 'r') as file:
        rules = file.read()
        return rules


class RuleResponse:
    def __init__(self, index: int, rule: str, enabled: bool):
        self.index = index
        self.rule = rule
        self.enabled = enabled


class ManageIDSController:
    def __init__(self, path):
        self.path = path

    def checkRulesFile(self):
        if os.path.isfile(self.path):
            return True
        else:
            # Throw exception
            raise Exception(f"File not found at path '{self.path}'")

    def getRules(self):
        rules = []
        try:
            if self.checkRulesFile():
                rules = parse_rules(readRulesFile(self.path))
            return rules
        except Exception as e:
            print(e)

    def retrieveRules(self):
        rules = []
        try:
            if self.checkRulesFile():
                rules = parse_rules(readRulesFile(self.path))
                rulesWithIndex = []
                for i in range(len(rules)):
                    rulesWithIndex.append(
                        {"index": i, "rule": rules[i].__str__(), "enabled": rules[i].enabled})
            return rulesWithIndex
        except Exception as e:
            print(e)

    def createRule(self, rule: str, enabled: bool):
        rules = self.getRules()
        rules.append(rule)
        self.writeRules(rules)
        if not enabled:
            self.disableRule(len(rules)-1)
        return jsonify({"message": "Rule created successfully"})

    def enableRule(self, idx: int):
        rules = self.getRules()
        if idx < len(rules):
            rules[idx].enabled = True
            self.writeRules(rules)
            return "Rule enabled"
        else:
            raise Exception(f"Index {idx} out of range")

    def disableRule(self, idx: int):
        rules = self.getRules()
        if idx < len(rules):
            rules[idx].enabled = False
            self.writeRules(rules)
            return jsonify({"message": "Rule disabled"})
        else:
            raise Exception(f"Index {idx} out of range")

    def modifyRule(self, idx: int, rule: str):
        rules = self.getRules()
        if idx < len(rules):
            rules[idx] = parse_rule(rule)
            self.writeRules(rules)
            return jsonify({"message": "Rule modified"})
        else:
            raise Exception(f"Index {idx} out of range")

    def writeRules(self, rules: list):
        with open(self.path, 'w') as file:
            for rule in rules:
                file.write(rule.__str__())
                file.write('\n')

    def deleteRule(self, idx: int):
        rules = self.getRules()
        if idx < len(rules):
            rules.pop(idx)
            self.writeRules(rules)
            return jsonify({"message": "Rule deleted"})
        else:
            raise Exception(f"Index {idx} out of range")


manageIDSController = ManageIDSController(localRules)


@manageIDS.route("/rules/retrieve", methods=['GET'])
def retrieveRules():
    rules = manageIDSController.retrieveRules()
    return jsonify(rules)


@manageIDS.route("/rules/retrieve/<id>", methods=['GET'])
def retrieveRule(id):
    rules = manageIDSController.retrieveRules()
    return jsonify(rules[int(id)])


@manageIDS.route("/rules/enable/<idx>", methods=['GET'])
def enableRule(idx):
    try:
        res = manageIDSController.enableRule(int(idx))
        return res
    except Exception as e:
        return str(e)


@manageIDS.route("/rules/disable/<idx>", methods=['GET'])
def disableRule(idx):
    try:
        res = manageIDSController.disableRule(int(idx))
        return res
    except Exception as e:
        return str(e)


@manageIDS.route("/rules/create", methods=['POST'])
def createRule():
    try:
        rule = request.get_json()['rule']
        enabled = request.get_json()['enabled']
        print(rule)
        res = manageIDSController.createRule(rule, enabled)
        return res
    except Exception as e:
        return str(e)


@manageIDS.route("/rules/delete/<idx>", methods=['GET'])
def deleteRule(idx):
    try:
        res = manageIDSController.deleteRule(int(idx))
        return res
    except Exception as e:
        return str(e)


@manageIDS.route("/rules/modify/<idx>", methods=['POST'])
def modifyRule(idx):
    try:
        res = manageIDSController.modifyRule(
            int(idx), request.get_json()['rule'])
        return res
    except Exception as e:
        return str(e)
